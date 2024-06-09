import { Router } from "express";
import { TodoController } from "../controller/index.js";

const todoRouter = Router();

todoRouter.route("/create-todo").post(TodoController.createTodo);
todoRouter.route("/get-todo").get(TodoController.getAllTodo);
todoRouter.route("/update-todo").patch(TodoController.updateTodo);
todoRouter.route("/delete-todo").delete(TodoController.deleteTodo);

export default todoRouter;
