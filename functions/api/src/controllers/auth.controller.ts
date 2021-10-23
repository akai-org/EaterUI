import { Request, Response } from "express";
import passport from "passport";
import db from "../db";

export const googleSignIn = passport.authenticate("google", {
  scope: ["profile"],
});

export const googleCallback = passport.authenticate("google", {
  failureRedirect: "/login",
});

export const userInfo = async (req: Request, res: Response) => {
  if (req.user) {
    const { id, displayName } = req.user;

    try {
      await db.user.findFirst({ where: { id } });
    } catch {
      await db.user.create({ data: { id, displayName } });
    }
  }

  res.json(req.user);
};

export const logout = (req: Request, res: Response) => {
  req.session = null;
  req.logout();
  res.redirect("/");
};
