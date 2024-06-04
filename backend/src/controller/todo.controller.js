import PromiseHandle from "../utils/promiseHandle.js";

export const createTodo = PromiseHandle(async (request, response, next) => {
  return response.status(200).send("Create Todo");
});

export const getAllTodo = PromiseHandle(async (request, response, next) => {
  return response.status(200).send("Get All Todo");
});

export const updateTodo = PromiseHandle(async (request, response, next) => {
  return response.status(200).send("update Todo");
});

export const deleteTodo = PromiseHandle(async (request, response, next) => {
  return response.status(200).send("delete Todo");
});
