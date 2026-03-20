//init env
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), "../.env"),
});

//Gemini SDK
import { GoogleGenAI, ToolUnion } from "@google/genai";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

//mcp sdk
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import readline from "readline/promises";

//express
import express from "express";
import type { RequestHandler } from "express";
import cors from "cors";

type Tool = {
  name: string;
  description?: string;
  input_schema?: unknown;
};

class MCPClient {
  private mcp: Client;
  private llm: GoogleGenAI;
  private transport: StdioClientTransport | null = null;
  public tools: Tool[] = [];

  constructor() {
    this.llm = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    this.mcp = new Client({ name: "mcp-client-cli", version: "1.0.0" });
  }

  // Connect to MCP
  async connectToServer(serverScriptPath: string) {
    try {
      const isJs = serverScriptPath.endsWith(".js");
      const isPy = serverScriptPath.endsWith(".py");
      if (!isJs && !isPy) {
        throw new Error("Server script must be a .js or .py file");
      }
      const command = isPy
        ? process.platform === "win32"
          ? "python"
          : "python3"
        : process.execPath;

      this.transport = new StdioClientTransport({
        command, // node /path/to/server.js
        args: [serverScriptPath],
      });

      await this.mcp.connect(this.transport);

      //register tools on connect
      const toolsResult = await this.mcp.listTools();

      this.tools = toolsResult.tools.map((tool) => {
        return {
          name: tool.name,
          description: tool.description,
          input_schema: tool.inputSchema,
        };
      });

      console.log(
        "Connected to server with tools:",
        this.tools.map(({ name }) => name),
      );
    } catch (error) {
      throw new Error(`Failed to connect to MCP server: ${error}`);
    }
  }

  async processQuery(query: string): Promise<string> {
    const contents: any[] = [{ role: "user", parts: [{ text: query }] }];

    const toolsForGemini = this.tools.map((t) => ({
      functionDeclarations: [
        {
          name: t.name,
          description: t.description ?? "",
          parameters: t.input_schema ?? { type: "object", properties: {} },
        },
      ],
    })) as any;

    // 1️⃣ First model call
    let response = await this.llm.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents,
      config: {
        systemInstruction: `
You are a helpful AI assistant.
Call tools when needed.
Use tool results to answer.
Respond clearly and concisely.
`,
        tools: toolsForGemini,
      },
    });

    const candidate = response.candidates?.[0];
    if (!candidate?.content?.parts) {
      return "Model returned no usable response.";
    }

    const functionCallPart = candidate.content.parts.find(
      (p: any) => p.functionCall,
    );

    // 2️⃣ If model wants to call a tool
    if (functionCallPart?.functionCall) {
      const { name, args } = functionCallPart.functionCall;

      if (!name) return "Invalid tool call.";

      const toolResult = await this.mcp.callTool({
        name,
        arguments: args ?? {},
      });

      // Add tool result properly
      contents.push(candidate.content);
      contents.push({
        role: "tool",
        parts: [
          {
            functionResponse: {
              name,
              response: toolResult,
            },
          },
        ],
      });

      // 3️⃣ Final model call with tool result
      response = await this.llm.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents,
      });

      return response.text ?? "No response from model.";
    }

    // If no tool call needed
    const textPart = candidate.content.parts.find(
      (p: any) => typeof p.text === "string",
    );

    return textPart?.text ?? "No response.";
  }

  //   async processQuery(query: string): Promise<string> {
  //     const toolsForGemini = this.tools.map((t) => ({
  //       name: t.name,
  //       description: t.description,
  //       parameters: t.input_schema,
  //     })) as unknown as ToolUnion[];

  //     const contents: any[] = [{ role: "user", parts: [{ text: query }] }];

  //     // 1️⃣ Generate first response
  //     const firstResponse = await this.llm.models.generateContent({
  //       model: "gemini-2.5-flash-lite",
  //       contents,
  //       config: {
  //         systemInstruction: `
  // You are a helpful AI assistant.
  // Use available tools when needed.
  // If tool results are provided, use them to answer.
  // Give clear, concise responses.
  // Do not mention tools unless necessary.
  // `,
  //         tools: toolsForGemini,
  //       },
  //     });

  //     // Parse JSON instructions
  //     let instructionsText =
  //       firstResponse.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
  //     instructionsText = instructionsText
  //       .replace(/^```json\n/, "")
  //       .replace(/\n```$/, "");

  //     let instructions: Array<any> = [];
  //     try {
  //       instructions = JSON.parse(instructionsText);
  //     } catch (e) {
  //       instructions = [{ type: "text", text: instructionsText }];
  //     }

  //     // 2️⃣ Process each instruction silently
  //     for (const instr of instructions) {
  //       if (instr.type === "tool" && instr.name) {
  //         // Execute the tool without printing debug
  //         const toolResult = await this.mcp.callTool({
  //           name: instr.name,
  //           arguments: instr.parameter ?? {},
  //         });

  //         // Append tool result to conversation for LLM
  //         contents.push({
  //           role: "user",
  //           parts: [{ text: JSON.stringify(toolResult) }],
  //         });
  //       } else if (instr.type === "text" && instr.text) {
  //         contents.push({ role: "model", parts: [{ text: instr.text }] });
  //       }
  //     }

  //     // 3️⃣ Generate final human-readable response
  //     const lastResponse = await this.llm.models.generateContent({
  //       model: "gemini-2.5-flash-lite",
  //       contents,
  //       config: {
  //         systemInstruction: `
  // You are a helpful AI assistant.
  // Use available tools when needed.
  // If tool results are provided, use them to answer.
  // Give clear, concise responses.
  // Do not mention tools unless necessary.
  // `,
  //       },
  //     });

  //     const finalText = lastResponse.candidates?.[0]?.content?.parts?.[0]?.text;

  //     // ✅ Only return the clean, readable output
  //     return finalText || "Oops! Something went wrong.";
  //   }

  async chatLoop() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    try {
      console.log("\nMCP Client Started!");
      console.log("Type your queries or 'quit' to exit.");

      while (true) {
        const message = await rl.question("\nQuery: ");
        if (message.toLowerCase() === "quit") {
          break;
        }
        const response = await this.processQuery(message);
        console.log("\n" + response);
      }
    } finally {
      rl.close();
    }
  }

  async cleanup() {
    await this.mcp.close();
  }
}

async function main() {
  if (process.argv.length < 3) {
    console.log("Usage: node index.ts <path_to_server_script>");
    return;
  }

  const app = express();
  const port = 3000;

  //Middleware
  app.use(cors());
  app.use(express.json());

  const mcpClient = new MCPClient();

  try {
    await mcpClient.connectToServer(process.argv[2]);

    const healthCheck: RequestHandler = async (req, res) => {
      res.json({ status: "ok", tools: mcpClient.tools.map((t) => t.name) });
    };
    app.get("/health", healthCheck);

    const chatHandler: RequestHandler = async (req, res) => {
      try {
        const { query } = req.body;
        if (!query) {
          return res
            .status(400)
            .json({ error: "Missing 'query' in request body" });
        }

        const response = await mcpClient.processQuery(query);
        res.json({ response });
      } catch (error) {
        console.error("Error processing query:", error);
        res.status(500).json({ error: "Failed to process query" });
      }
    };
    app.post("/chat", chatHandler);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Health Check: http://localhost:${port}/health`);
      console.log(`Chat Endpoint: http://localhost:${port}/chat`);
    });

    // Handle graceful shutdown
    process.on("SIGTERM", async () => {
      console.log(`SIGTERM received, shutting down gracefully...`);
      await mcpClient.cleanup();
      process.exit(0);
    });
  } catch (e) {
    console.error("Failed to start server:", e);
    process.exit(1);
  }
}

main();
