import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodo,
  updateTodo,
} from "../controller/todo.controller.js";

const todoRouter = Router();

todoRouter.route("/create-todo").post(createTodo);
todoRouter.route("/get-todo").get(getAllTodo);
todoRouter.route("/update-todo").patch(updateTodo);
todoRouter.route("/delete-todo").delete(deleteTodo);

export default todoRouter;
