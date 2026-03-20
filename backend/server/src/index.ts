import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import nodemailer from "nodemailer";
import { z } from "zod";

const server = new McpServer({
  name: "secret_weapon",
  version: "1.0.0",
});

server.registerTool(
  "send_email",
  {
    description: "Send an email using your Gmail (or other SMTP) account",
    inputSchema: z.object({
      to: z.string().email().describe("Recipient email address"),
      subject: z.string().describe("Email subject"),
      body: z.string().describe("Email content"),
    }), 
  },
  async ({ to, subject, body }) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nightmarekun321@gmail.com",
        pass: "gddgkvemsxuqhgso",
      },
    });

    try {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_ADDRESS,
        to,
        subject,
        text: body,
      });

      return {
        content: [
          {
            type: "text",
            text: `Email successfully sent to ${to}! Message ID: ${info.messageId}`,
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          { type: "text", text: `Failed to send email: ${error.message}` },
        ],
      };
    }
  },
);

server.registerTool(
  "add_numbers",
  {
    description: "Adds two numbers together.",
    inputSchema: {
      x: z.number().describe("The first number to add."),
      y: z.number().describe("The second number to add."),
    },
  },
  async ({ x, y }) => {
    const sum = x + y;
    return {
      content: [
        {
          type: "text",
          text: `The sum of ${x} and ${y} is ${sum}.`,
        },
      ],
    };
  },
);

server.registerTool(
  "get_github_repos",
  {
    description: "Retrieves GitHub repositories for a given user.",
    inputSchema: {
      username: z
        .string()
        .describe("The GitHub username to retrieve repositories for."),
    },
  },
  async ({ username }) => {
    const res = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: { userAgent: "MCP-Server" },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch repositories for user ${username}. Status: ${res.status}`,
      );
    }

    const repos = await res.json();

    const repoList = repos
      .map((repo: any, i: number) => `${i + 1}. ${repo.name}`)
      .join("\n\n");

    return {
      content: [
        { type: "text", text: `GitHub repositories for user ${username}:` },
        { type: "text", text: repoList },
      ],
    };
  },
);

const main = async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
};

main().catch((error) => {
  console.log("Error in main!!: ", error);
});
