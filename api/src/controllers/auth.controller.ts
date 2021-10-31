import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { HttpError } from "../errors/HttpError";

export const googleSignIn = passport.authenticate("google", {
  scope: ["profile"],
});

export const googleCallback = passport.authenticate("google", {
  successRedirect: "/auth",
  failureRedirect: "/login",
});

export const getUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req?.user) {
      throw new HttpError(401, `You're not authorized`);
    }

    res.json(req.user);
  } catch (error) {
    next(error);
  }
};

export const logout = (req: Request, res: Response) => {
  req.session = null;
  req.logout();
  res.redirect("/");
};
