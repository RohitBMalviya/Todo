import { Todo } from "../models/index.js";
import { PromiseHandle, ApiError, ApiResponse } from "../utils/index.js";

export const createTodo = PromiseHandle(async (request, response, _) => {
  const todoData = request.body;
  const todo = await Todo.create(todoData);
  if (!todo) {
    return response
      .status(500)
      .json(new ApiError(500, "Something went wrong while creating the todo."));
  }
  return response
    .status(201)
    .json(new ApiResponse(201, todo, "Todo created Successfully. !!!"));
});

export const getAllTodo = PromiseHandle(async (_, response, _) => {
  const todos = await Todo.find();
  return response
    .status(201)
    .json(new ApiResponse(201, todos, "All todo fetch Successfully. !!!"));
});

export const getSingleTodo = PromiseHandle(async (request, response, _) => {
  const userId = request.params;
  const todo = await Todo.findById(userId);
  return response
    .status(201)
    .json(new ApiResponse(201, todo, "Todo fetch Successfully. !!!"));
});

export const updateTodo = PromiseHandle(async (request, response, _) => {
  const todoData = request.body;
  const userId = request.params;
  const todo = await Todo.findByIdAndUpdate(
    userId,
    {
      $set: { todoData },
    },
    { new: true }
  );
  return response
    .status(200)
    .json(new ApiResponse(200, todo, "Todo updated Successfully. !!!"));
});

export const deleteTodo = PromiseHandle(async (request, response, _) => {
  const userId = request.params;
  const todo = await Todo.findByIdAndDelete(userId);
  return response
    .status(201)
    .json(new ApiResponse(201, todo, "Todo deleted Successfully. !!!"));
});
