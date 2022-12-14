import { config } from "dotenv";
import { Pool } from "pg";

config();

const isTest = process.env.NODE_ENV === "test";

const pool = new Pool({
  database: isTest ? process.env.PG_DB_TEST : process.env.PG_DB,
  host: process.env.PG_HOST,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
  user: process.env.PG_USER,
});

export const query = async (text: string, params?: never) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log("executed query", { text, duration, rows: res.rowCount });
  return res;
};
