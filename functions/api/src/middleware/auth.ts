import { Request, Response } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: () => void
) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};
