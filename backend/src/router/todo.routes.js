import { Router } from "express";
import { TodoController } from "../controller/index.js";
import { auth } from "../middleware/index.js";
const todoRouter = Router();

todoRouter.route("/create-todo").post(auth, TodoController.createTodo);
todoRouter.route("/get-all-todo").get(auth, TodoController.getAllTodo);
todoRouter
  .route("/get-single-todo/:id")
  .get(auth, TodoController.getSingleTodo);
todoRouter.route("/update-todo/:id").patch(auth, TodoController.updateTodo);
todoRouter.route("/delete-todo/:id").delete(auth, TodoController.deleteTodo);

export default todoRouter;
