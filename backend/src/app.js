import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Router

import userRouter from "./router/user.routes.js";
import todoRouter from "./router/todo.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/todos", userRouter);

export default app;
