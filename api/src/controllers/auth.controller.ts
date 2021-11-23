import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { HttpError } from "../errors/HttpError";

export const googleSignIn = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { returnTo } = req.query;
  const state = returnTo
    ? Buffer.from(JSON.stringify({ returnTo })).toString("base64")
    : undefined;
  const authenticator = passport.authenticate("google", {
    scope: ["profile"],
    state,
  });
  authenticator(req, res, next);
};

export const googleCallback = passport.authenticate("google", {
  failureRedirect: "/login",
});

export const googleCallbackRedirect = (req: Request, res: Response) => {
  try {
    const { state } = req.query;
    const { returnTo } = JSON.parse(
      Buffer.from(state as String, "base64").toString(),
    );
    if (returnTo) {
      return res.redirect(returnTo);
    }
  } catch (error) {
    console.error(error);
  }

  res.redirect("/");
};

export const getUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
  let callbackUrl = "/";

  if (req?.query.returnTo) {
    callbackUrl = req?.query.returnTo as string;
  } else if (req?.header("Referer")) {
    callbackUrl = req.header("Referer") as string;
  }

  req.logout();
  res.clearCookie("google-auth-session");

  res.redirect(callbackUrl);
};
