import { Pool } from "pg";

// In development, reuse the pool across hot reloads
const globalForDb = globalThis;

const pool =
  globalForDb.pool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.pool = pool;
}

export async function query(text, params) {
  const result = await pool.query(text, params);
  return result;
}

export async function getClient() {
  return pool.connect();
}
