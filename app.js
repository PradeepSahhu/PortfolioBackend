import userRouter from "./src/routes/projects.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import express from "express";

const app = express();
app.use(express.json({ limit: "20kb" }));
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));
app.use(cookieParser());

app.use("/", userRouter);

export { app };
