import ApiError from "../utils/apiError.js";
import PromiseHandle from "../utils/promiseHandle.js";

export const login = PromiseHandle(async (request, response, next) => {
  const { email, password } = request.body;
  if (!(email && password)) {
    return response
      .status(401)
      .json(new ApiError(401, "Email and Password is Requried",));
    // throw new ApiError(401, "Email and Password is Requried");
  }
});

export const signUp = PromiseHandle(async (request, response, next) => {
  return response.status(200).send("SignUp");
});

export const logout = PromiseHandle(async (request, response, next) => {
  return response.status(200).send("Logout");
});

export const getUserDetail = PromiseHandle(async (request, response, next) => {
  return response.status(200).send("Get User Detail");
});

export const updateUserDetail = PromiseHandle(
  async (request, response, next) => {
    return response.status(200).send("Update User Detail");
  }
);

export const updatePassword = PromiseHandle(async (request, response, next) => {
  return response.status(200).send("Update Password");
});

export const forgotPassword = PromiseHandle(async (request, response, next) => {
  return response.status(200).send("Forgot Password");
});

// Admin

export const deleteUser = PromiseHandle(async (request, response, next) => {
  return response.status(200).send("Delete User");
});

export const updateRole = PromiseHandle(async (request, response, next) => {
  return response.status(200).send("Update Role");
});

export const getAllUser = PromiseHandle(async (request, response, next) => {
  return response.status(200).send("Get All User");
});
