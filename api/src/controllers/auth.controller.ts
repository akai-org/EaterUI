import { Request, Response } from "express";
import passport from "passport";
import db from "../db";

export const googleSignIn = passport.authenticate("google", {
  scope: ["profile"],
});

export const googleCallback = passport.authenticate("google", {
  successRedirect: "/auth",
  failureRedirect: "/login",
});

export const getUserInfo = async (req: Request, res: Response) => {
  if (req.user) {
    const { id, displayName } = req.user;

    const user = await db.user.findFirst({ where: { id } });

    if (!user) {
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
