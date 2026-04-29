import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import dotenv from "dotenv";
import * as schema from "./schema.js";

dotenv.config();

neonConfig.webSocketConstructor = ws;

const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;

if (!connectionString) {
  console.warn("NEON_DATABASE_URL / DATABASE_URL not set. Database operations will fail.");
}

export const pool = new Pool({ connectionString });
export const db = drizzle(pool, { schema });

const connectDB = async () => {
  if (!connectionString) {
    console.warn("No Postgres connection string set. Skipping connection check.");
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
