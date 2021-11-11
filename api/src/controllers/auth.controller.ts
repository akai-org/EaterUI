import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { HttpError } from "../errors/HttpError";

export const googleSignIn = passport.authenticate("google", {
  scope: ["profile"],
});

export const googleCallback = passport.authenticate("google", {
  failureRedirect: "/login",
});

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
  const redirectUrl = req?.session?.callbackUrl;

  req.session = null;
  req.logout();
  res.clearCookie("google-auth-session");

  if (redirectUrl) {
    res.redirect(redirectUrl);
  } else {
    res.redirect("/");
  }
};

export const storeUIRedirectUrl = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (req?.session) {
    if (req?.query.origin) {
      req.session.callbackUrl = req?.query.origin;
    } else if (req?.header("Referer")) {
      req.session.callbackUrl = req.header("Referer");
    }
  }

  next();
};

export const redirectToUIUrl = (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const redirectUrl = req?.session?.callbackUrl;

  if (redirectUrl) {
    res.redirect(redirectUrl);
  } else {
    res.redirect("/");
  }
};
