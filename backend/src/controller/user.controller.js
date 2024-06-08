import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import PromiseHandle from "../utils/promiseHandle.js";

export const login = PromiseHandle(async (request, response, next) => {
  const { email, password } = request.body;
  if (!(email && password)) {
    return response
      .status(400)
      .json(new ApiError(400, "Email and Password is requried."));
  }
});

export const signUp = PromiseHandle(async (request, response, next) => {
  const { username, email, password, confirm_password, role } = request.body;
  const allFieldsRequired = [username, email, password, confirm_password].some(
    (fields) => fields !== ""
  );
  if (!allFieldsRequired) {
    return response
      .status(400)
      .json(new ApiError(400, "All fields are requried."));
  }
  if (password !== confirm_password) {
    return response
      .status(400)
      .json(new ApiError(400, "Password does not match."));
  }
  const userAlreadyExists = await User.findOne({ email, username });
  if (userAlreadyExists) {
    return response.status(406).json(new ApiError(406, "User already exists."));
  }
  const signupUser = await User.create({
    username,
    email,
    password,
    confirm_password,
    role,
  });

  signupUser.validateSync();

  if (!signupUser) {
    return response
      .status(400)
      .json(new ApiError(400, "Something went wrong while Signing Up."));
  }

  return response
    .status(201)
    .json(new ApiResponse(201, "User signUp successfully. !!!"));
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
