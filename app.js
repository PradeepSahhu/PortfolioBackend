import projectRouter from "./src/routes/projects.routes.js";
import userRouter from "./src/routes/user.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import express from "express";

const allowedOrigins = [
  "http://localhost:3000",
  "https://pradeepsahu.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow request
    } else {
      callback(new Error("Not allowed by CORS")); // Block request
    }
  },
  credentials: true, // Allow cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Ensure all HTTP methods work
  allowedHeaders: ["Content-Type", "Authorization"], // Allow required headers
};

const app = express();
app.use(cookieParser());
app.use(express.json({ limit: "20kb" }));
app.use(cors(corsOptions));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

app.use("/", projectRouter);
app.use("/", userRouter);

export { app };
