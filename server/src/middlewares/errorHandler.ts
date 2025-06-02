import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Unhandled Error:", err.stack);
  res.status(500).json({ error: "Something went wrong on the server." });
}
