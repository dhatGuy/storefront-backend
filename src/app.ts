import express, { Application, Request, Response } from "express";
import { mountRoutes } from "./handlers";

const app: Application = express();

app.use(express.json());

mountRoutes(app);

app.get("/", async function (req: Request, res: Response) {
  res.send("Hello World!");
});

export default app;
