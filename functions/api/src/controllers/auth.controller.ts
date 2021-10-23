import { Request, Response } from "express";
import passport from "passport";

export const googleSignIn = passport.authenticate("google", {
  scope: ["profile"],
});

export const googleCallback = passport.authenticate("google", {
  failureRedirect: "/login",
});

export const userInfo = (req: Request, res: Response) => {
  res.json(req.user);
};

export const logout = (req: Request, res: Response) => {
  req.session = null;
  req.logout();
  res.redirect("/");
};
