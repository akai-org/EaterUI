import express from "express";

const app = express();

app.get("/", (_, res) => {
  res.json({ hello: "world" });
});

export default app;
