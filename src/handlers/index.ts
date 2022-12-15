import { Application } from "express";
import orderRouter from "./order.routes";
import productRouter from "./product.routes";
import userRouter from "./user.routes";

export const mountRoutes = (app: Application) => {
  app.use("/users", userRouter);
  app.use("/products", productRouter);
  app.use("/orders", orderRouter);
};
