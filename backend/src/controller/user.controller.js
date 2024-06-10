import { User } from "../models/index.js";
import {
  ApiError,
  ApiResponse,
  PromiseHandle,
  generateAccessTokenRefreshToken,
  sendMail,
} from "../utils/index.js";

export const signUp = PromiseHandle(async (request, response, _) => {
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
  const signUpUser = await User.create({
    username,
    email,
    password,
    confirm_password,
    role,
  });
  signUpUser.validateSync();
  const emailType = "VERIFY";
  await sendMail(signUpUser._id, signUpUser.email, emailType);
  const tocheckUserSignUp = await User.findById(signUpUser._id).select(
    "-password"
  );
  if (!tocheckUserSignUp) {
    return response
      .status(400)
      .json(new ApiError(400, "User signUp data is not store in database."));
  }
  return response
    .status(201)
    .json(
      new ApiResponse(201, tocheckUserSignUp, "User signUp successfully. !!!")
    );
});

export const verifyUser = PromiseHandle(async (request, response, _) => {
  const { token } = request.query;
  const user = await User.findOne({
    verifiedToken: token,
    verifiedTokenExpire: { $gt: Date.now() },
  });
  if (!user) {
    return response
      .status(400)
      .json(new ApiError(400, "Invalid token or expired."));
  }
  user.isVerified = true;
  user.verifiedToken = undefined;
  user.verifiedTokenExpire = undefined;
  await user.save({ validateBeforeSave: false });
  return response
    .status(200)
    .json(
      new ApiResponse(
        200,
        { userVerified: user.isVerified },
        "User verified successfully. !!!"
      )
    );
});

export const login = PromiseHandle(async (request, response, _) => {
  const { email, password } = request.body;
  if (!(email && password)) {
    return response
      .status(400)
      .json(new ApiError(400, "Email and Password is requried."));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return response
      .status(404)
      .json(new ApiError(404, "User does not exists."));
  }
  const checkPasswordCorrect = await user.compareGenerateHashPassword(password);
  if (!checkPasswordCorrect) {
    return response
      .status(401)
      .json(
        new ApiError(
          401,
          "Password is incorrect please enter a correct Password."
        )
      );
  }
  if (!user.isVerified) {
    return response
      .status(401)
      .json(new ApiError(401, "Please verify first to login."));
  }
  const options = {
    httpOnly: true,
    secure: true,
  };
  const { accessToken, refreshToken } = await generateAccessTokenRefreshToken(
    user._id
  );
  const loginUser = await User.findById(user._id).select("-password");
  if (!loginUser) {
    return response
      .status(404)
      .json(new ApiError(404, "User does not exists."));
  }
  return response
    .status(200)
    .cookie("accessToken", accessToken, {
      ...options,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    })
    .cookie("refreshToken", refreshToken, {
      ...options,
      expires: new Date(Date.now() + 72 * 60 * 60 * 1000),
    })
    .json(new ApiResponse(200, loginUser, "User login successfully. !!!"));
});

export const logout = PromiseHandle(async (request, response, _) => {
  const userId = request.body;
  const user = await User.findById(userId);
  if (!user) {
    return response.status(404).json(new ApiError(404, "User not found."));
  }
  user.accessToken = undefined;
  user.refreshToken = undefined;
  await user.save({ validateBeforeSave: false });
  return response
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .status(200)
    .json(new ApiResponse(200, {}, "User logout successfully. !!!"));
});

export const getUserDetail = PromiseHandle(async (request, response, _) => {
  const userId = request.body;
  const user = await User.findById(userId);
  if (!user) {
    return response.status(404).json(new ApiError(404, "User not found."));
  }
  return response
    .status(200)
    .json(new ApiResponse(200, user, "User data fetch successfully. !!!"));
});

export const updateUserDetail = PromiseHandle(async (request, response, _) => {
  const { username } = request.body;
  const userId = request.body;
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: { username: username },
    },
    { new: true }
  ).select("-password");
  return response
    .status(200)
    .json(new ApiResponse(200, user, "User detail updated successfully. !!!"));
});

export const updatePassword = PromiseHandle(async (request, response, _) => {
  return response.status(200).send("Update Password");
});

export const forgotPassword = PromiseHandle(async (request, response, _) => {
  return response.status(200).send("Forgot Password");
});

// Admin

export const deleteUser = PromiseHandle(async (request, response, _) => {
  return response.status(200).send("Delete User");
});

export const updateRole = PromiseHandle(async (request, response, _) => {
  return response.status(200).send("Update Role");
});

export const getAllUser = PromiseHandle(async (request, response, _) => {
  return response.status(200).send("Get All User");
});
