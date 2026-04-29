import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import dotenv from "dotenv";
import * as schema from "./schema.js";

dotenv.config();

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL not set. Database operations will fail.");
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });

const connectDB = async () => {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL not set. Skipping Postgres connection check.");
    return;
  }
  try {
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();
    console.log("Connected to Postgres (Neon)");
  } catch (err) {
    console.error("Error connecting to Postgres:", err.message);
  }
};

export default connectDB;
