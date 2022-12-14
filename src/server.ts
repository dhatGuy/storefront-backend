import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.listen(PORT, function () {
  console.log(`🚀 Magic is happening on port ${PORT} 🚀`);
});
