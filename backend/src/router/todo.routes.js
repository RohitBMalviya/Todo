import { Router } from "express";
import { TodoController } from "../controller/index.js";

const todoRouter = Router();

todoRouter.route("/create-todo").post(TodoController.createTodo);
todoRouter.route("/get-all-todo").get(TodoController.getAllTodo);
todoRouter.route("/get-single-todo/:id").get(TodoController.getSingleTodo);
todoRouter.route("/update-todo/:id").patch(TodoController.updateTodo);
todoRouter.route("/delete-todo/:id").delete(TodoController.deleteTodo);

export default todoRouter;
