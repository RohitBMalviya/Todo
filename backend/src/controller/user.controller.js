import { User } from "../models/index.js";
import JWT from "jsonwebtoken";
import {
  ApiError,
  ApiResponse,
  PromiseHandle,
  generateAccessTokenRefreshToken,
  sendMail,
  config,
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
  const userAlreadyExists = await User.findOne({
    email: email,
    username: username,
  });
  if (userAlreadyExists) {
    return response.status(400).json(new ApiError(400, "User already exists."));
  }
  const signUpUser = await User.create({
    username,
    email,
    password,
    confirm_password,
    role,
  });
  signUpUser.validateSync();
  if (!signUpUser) {
    return response
      .status(500)
      .json(new ApiError(500, "Something went wrong while creating the todo."));
  }
  const emailType = "VERIFY";
  await sendMail(signUpUser._id, signUpUser.email, emailType);
  const tocheckUserSignUp = await User.findById(signUpUser._id).select(
    "-password"
  );
  if (!tocheckUserSignUp) {
    return response
      .status(406)
      .json(new ApiError(406, "User signUp data is not store in database."));
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
      expires: new Date(Date.now() + 30 * 60 * 1000),
    })
    .cookie("refreshToken", refreshToken, {
      ...options,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    })
    .json(
      new ApiResponse(
        200,
        { loginUser, accessToken, refreshToken },
        "User login successfully. !!!"
      )
    );
});

export const logout = PromiseHandle(async (request, response, _) => {
  const userId = request.user;
  const user = await User.findById(userId._id);
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
  const userId = request.user;
  const user = await User.findById(userId._id).select("-password");
  if (!user) {
    return response.status(404).json(new ApiError(404, "User not found."));
  }
  return response
    .status(200)
    .json(new ApiResponse(200, user, "User data fetch successfully. !!!"));
});

export const updateUserDetail = PromiseHandle(async (request, response, _) => {
  const { username, gender, address, birthDay } = request.body;
  const userId = request.user;
  const user = await User.findByIdAndUpdate(
    userId._id,
    {
      $set: {
        username: username,
        gender: gender,
        address: address,
        birthDay: birthDay,
      },
    },
    { new: true }
  ).select("-password");
  return response
    .status(200)
    .json(new ApiResponse(200, user, "User detail updated successfully. !!!"));
});

export const updatePassword = PromiseHandle(async (request, response, _) => {
  const { password, newpassword, confirm_password } = request.body;
  const userId = request.user;
  const user = await User.findById(userId._id);
  const checkPassword = await user.compareGenerateHashPassword(password);
  if (!checkPassword) {
    return response
      .status(401)
      .json(
        new ApiError(401, "old Password does not match please enter again.")
      );
  }
  if (newpassword !== confirm_password) {
    return response
      .status(401)
      .json(new ApiError(401, "Password does not match please enter again."));
  }
  user.validateSync();
  user.password = newpassword;
  user.confirm_password = confirm_password;
  await user.save();
  return response
    .status(200)
    .json(
      new ApiResponse(200, user, "User password updated successfully. !!!")
    );
});

export const forgotPassword = PromiseHandle(async (request, response, _) => {
  const { email } = request.body;
  const user = await User.findOne({ email });
  if (!user) {
    return response
      .status(404)
      .json(new ApiError(404, "User does not exists."));
  }
  const emailType = "FORGOT";
  await sendMail(user._id, user.email, emailType);
  return response
    .status(200)
    .json(
      new ApiResponse(200, {}, "Forgot password email send successfully. !!!")
    );
});

export const resetPassword = PromiseHandle(async (request, response, _) => {
  const { password, confirm_password } = request.body;
  const { token } = request.query;
  if (password !== confirm_password) {
    return response
      .status(401)
      .json(new ApiError(401, "Password does not match please enter again."));
  }
  const user = await User.findOne({
    forgotPasswordToken: token,
    forgotPasswordTokenExpire: { $gt: Date.now() },
  });
  if (!user) {
    return response
      .status(400)
      .json(new ApiError(400, "Time out or token expired please try again."));
  }
  user.forgotPasswordToken = undefined;
  user.forgotPasswordTokenExpire = undefined;
  user.password = password;
  user.confirm_password = confirm_password;
  user.validateSync();
  await user.save();
  return response
    .status(200)
    .json(new ApiResponse(200, {}, "User password reset successfully. !!!"));
});

export const deleteAccount = PromiseHandle(async (request, response, _) => {
  const userId = request.user;
  await User.findByIdAndDelete(userId._id);
  return response
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, {}, "User account deleted successfully. !!!"));
});

export const updateAndVerifyEmail = PromiseHandle(
  async (request, response, _) => {
    const { email } = request.body;
    const userId = request.user._id;
    const user = await User.findById(userId);
    const emailType = "VERIFY";
    await sendMail(user._id, email, emailType);
    user.email = email;
    user.isVerified = false;
    await user.save({ validateBeforeSave: false });
    return response
      .status(200)
      .json(
        new ApiResponse(200, {}, "User email address updated successfully. !!!")
      );
  }
);

export const refreshToken = PromiseHandle(async (request, response, _) => {
  const incomingToken =
    request.cookies?.refreshToken ||
    request.body.refreshToken ||
    request.header("Authorization")?.replace("Bearer", "");
  if (!incomingToken) {
    return response
      .status(401)
      .json(new ApiError(401, "UnAuthorized request."));
  }
  try {
    const decodeToken = JWT.verify(incomingToken, config.REFRESH_TOKEN);
    const user = await User.findById(decodeToken?._id).select(
      "-password +refreshToken"
    );
    if (!user) {
      return response.status(404).json(new ApiError(404, "User not found."));
    }
    if (incomingToken !== user?.refreshToken) {
      return response
        .status(401)
        .json(new ApiError(401, "Refresh token is used or expired."));
    }
    const options = {
      httpOnly: true,
      secure: true,
    };
    const { accessToken, newRefreshToken } =
      await generateAccessTokenRefreshToken(user._id);
    return response
      .status(200)
      .status(200)
      .cookie("accessToken", accessToken, {
        ...options,
        expires: new Date(Date.now() + 30 * 60 * 1000),
      })
      .cookie("newRefreshToken", newRefreshToken, {
        ...options,
        expires: new Date(Date.now() + 60 * 60 * 1000),
      })
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refresh successfully. !!!"
        )
      );
  } catch (error) {
    return response
      .status(401)
      .json(new ApiError(401, error?.message || "Invalid refresh Token."));
  }
});

// Todo For Phone Number Verification
export const verifyPhoneNumber = PromiseHandle(async (request, response, _) => {
  return response.send("verifyPhoneNumber");
});

// Admin

export const getAllUser = PromiseHandle(async (request, response, _) => {
  const allUser = await User.find();
  return response
    .status(200)
    .json(
      new ApiResponse(200, allUser, "All user detail fetch successfully. !!!")
    );
});

export const getSingleUser = PromiseHandle(async (request, response, _) => {
  const userId = request.params.id;
  const singleUser = await User.findById(userId);
  if (!singleUser) {
    return response.status(404).json(new ApiError(404, "User not found."));
  }
  return response
    .status(200)
    .json(
      new ApiResponse(
        200,
        singleUser,
        "All user detail fetch successfully. !!!"
      )
    );
});

export const updateRole = PromiseHandle(async (request, response, _) => {
  const { role } = request.body;
  const userId = request.params.id;
  await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        role: role,
      },
    },
    { new: true }
  );
  return response
    .status(200)
    .json(
      new ApiResponse(200, {}, "User role updated by admin successfully. !!!")
    );
});

export const deleteUser = PromiseHandle(async (request, response, _) => {
  const userId = request.params.id;
  await User.findByIdAndDelete(userId);
  return response
    .status(200)
    .json(new ApiResponse(200, {}, "User deleted by admin successfully. !!!"));
});
