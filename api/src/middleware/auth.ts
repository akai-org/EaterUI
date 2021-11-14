import { NextFunction, Request, Response } from "express";
import { HttpError } from "./../errors/HttpError";

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    throw new HttpError(401, `You're not authorized`);
  }

  const accessToken = bearerToken.replace("Bearer ", "");
  req.headers.access_token = accessToken;

  next();
};
