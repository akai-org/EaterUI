import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import configurePassport from "./config/passport";
import router from "./router";
import { authMiddleware } from "./middleware/auth";

dotenv.config();

const app = express();

app.use(
  cookieSession({
    name: "google-auth-session",
    keys: [process.env.SECRET_SESSION_KEY!],
  })
);
app.use(passport.initialize());
app.use(passport.session());

configurePassport();

app.use("/", router);

// test endpoints - to be removed
app.get("/hello", (req, res) => {
  console.log({ session: req.user });
  res.json({ hello: "world" });
});

app.get("/protected", authMiddleware, (req, res) => {
  console.log({ session: req.user });
  res.json({ hello: "protected world" });
});

export default app;
