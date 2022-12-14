import { Application } from "express";
import userRouter from "./user.routes";

export const mountRoutes = (app: Application) => {
  app.use("/users", userRouter);
};
