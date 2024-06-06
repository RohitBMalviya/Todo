import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(urlencoded({ limit: "20kb", extended: true }));
app.use(express.json({ limit: "20kb" }));
app.use(cookieParser());

// Router

import userRouter from "./router/user.routes.js";
import todoRouter from "./router/todo.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/todos", userRouter);

export default app;
