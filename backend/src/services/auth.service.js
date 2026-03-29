import { query, getClient } from "../db.js";
import bcrypt from "bcrypt";

export const registerAuth = async (email, password) => {
  // Check if email already exists
  const existing = await query("SELECT id FROM auth WHERE email = $1", [email]);
  if (existing.rows.length > 0) throw new Error("Email already in use.");

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert into auth and return the id
  const { rows } = await query(
    "INSERT INTO auth (email, password) VALUES ($1, $2) RETURNING id",
    [email, hashedPassword],
  );
  return rows[0].id; // ✅ just returns authId
};

export const loginAuth = async (email, password) => {
  const { rows } = await query("SELECT * FROM auth WHERE email = $1", [email]);
  if (rows.length === 0) throw new Error("Invalid email or password.");

  const isMatch = await bcrypt.compare(password, rows[0].password);
  if (!isMatch) throw new Error("Invalid email or password.");

  return rows[0];
};
