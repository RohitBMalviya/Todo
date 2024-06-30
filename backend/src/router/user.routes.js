import { Router } from "express";
import { UserController } from "../controller/index.js";
import { auth, admin } from "../middleware/index.js";

const userRouter = Router();

userRouter.route("/verify-user").get(UserController.verifyUser);
userRouter.route("/get-detail").get(auth, UserController.getUserDetail);
userRouter.route("/signup").post(UserController.signUp);
userRouter.route("/login").post(UserController.login);
userRouter.route("/logout").post(auth, UserController.logout);
userRouter
  .route("/verify-phone-number")
  .post(auth, UserController.verifyPhoneNumber);
userRouter.route("/refresh-token").post(UserController.refreshToken);
userRouter.route("/update-detail").patch(auth, UserController.updateUserDetail);
userRouter.route("/update-password").patch(auth, UserController.updatePassword);
userRouter
  .route("/update-email")
  .patch(auth, UserController.updateAndVerifyEmail);
userRouter.route("/delete-account").delete(auth, UserController.deleteAccount);
userRouter.route("/forgot-password").post(UserController.forgotPassword);
userRouter.route("/reset-password").patch(UserController.resetPassword);

// Admin
userRouter
  .route("/get-single-user/:id")
  .get(auth, admin, UserController.getSingleUser);
userRouter.route("/get-all-user/").get(auth, admin, UserController.getAllUser);
userRouter
  .route("/update-role/:id")
  .patch(auth, admin, UserController.updateRole);
userRouter
  .route("/delete-user/:id")
  .delete(auth, admin, UserController.deleteUser);

export default userRouter;
