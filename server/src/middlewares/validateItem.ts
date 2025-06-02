import { Request, Response, NextFunction } from "express";

export function validateItem(req: Request, res: Response, next: NextFunction) {
  const { name } = req.body;
  if (!name || typeof name !== "string") {
     res.status(400).json({ error: "Name is required and must be a string." });
     return;
  }
  next();
}