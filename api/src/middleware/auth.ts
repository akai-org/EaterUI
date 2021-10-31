import { NextFunction, Request, Response } from "express";
import { HttpError } from "./../errors/HttpError";

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    if (req.user) {
      next();
    } else {
      throw new HttpError(401, `You're not authorized`);
    }
  } catch (error) {
    next(error);
  }
};
