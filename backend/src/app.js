import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(urlencoded({ limit: "20kb", extended: true }));
app.use(express.json({ limit: "20kb" }));
app.use(cookieParser());

// Router

import { userRouter, todoRouter } from "./router/index.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/todos", todoRouter);

export default app;
