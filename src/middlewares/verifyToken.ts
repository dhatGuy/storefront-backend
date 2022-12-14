import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

// extend the Request interface
export interface RequestWithUser extends Request {
  user?: User;
}

export default (req: RequestWithUser, res: Response, next: NextFunction) => {
  const token = req.header("authorization")?.split(" ")[1];
  if (!token) return res.status(401).send("Auth required");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET as string);
    req.user = verified as User;
    next();
  } catch (error) {
    error instanceof jwt.JsonWebTokenError
      ? res.status(401).send(error.message)
      : error instanceof jwt.TokenExpiredError
      ? res.status(401).send(error.message)
      : error instanceof jwt.NotBeforeError
      ? res.status(401).send(error.message)
      : res.status(400).json(error);
  }
};