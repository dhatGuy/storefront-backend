import express, { Application, Request, Response } from "express";
import { query } from "./database";

const app: Application = express();

app.use(express.json());

app.get("/", async function (req: Request, res: Response) {
  const result = await query("SELECT NOW()");
  console.log(result.rows[0]);
  res.send("Hello World!");
});

export default app;
