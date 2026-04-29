import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import dotenv from "dotenv";

dotenv.config();

neonConfig.webSocketConstructor = ws;

const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
if (!connectionString) {
  console.error("No Postgres connection string set.");
  process.exit(1);
}

const pool = new Pool({ connectionString });
const client = await pool.connect();
try {
  console.log("Wiping public schema in Neon...");
  await client.query("DROP SCHEMA IF EXISTS public CASCADE;");
  await client.query("CREATE SCHEMA public;");
  await client.query("GRANT ALL ON SCHEMA public TO public;");
  console.log("Neon database wiped clean.");
} finally {
  client.release();
  await pool.end();
}
