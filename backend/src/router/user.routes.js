import { Router } from "express";
import {
  deleteUser,
  forgotPassword,
  getAllUser,
  getUserDetail,
  login,
  logout,
  signUp,
  updatePassword,
  updateRole,
  updateUserDetail,
} from "../controller/user.controller.js";

const userRouter = Router();

userRouter.route("/login").post(login);
userRouter.route("/signup").post(signUp);
userRouter.route("/get-detail").post(getUserDetail);
userRouter.route("/logout").post(logout);
userRouter.route("/update-detail").put(updateUserDetail);
userRouter.route("/update-password").patch(updatePassword);
userRouter.route("/forgot-password").patch(forgotPassword);

// Admin
userRouter.route("/update-role").patch(updateRole);
userRouter.route("/delete-user").delete(deleteUser);
userRouter.route("/get-all-user").delete(getAllUser);

export default userRouter;
