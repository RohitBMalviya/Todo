import { Router } from "express";
import { UserController } from "../controller/index.js";
import { auth, authRole } from "../middleware/index.js";

const userRouter = Router();

userRouter.route("/login").post(UserController.login);
userRouter.route("/signup").post(UserController.signUp);
userRouter.route("/get-detail").get(auth, UserController.getUserDetail);
userRouter.route("/logout").post(auth, UserController.logout);
userRouter.route("/update-detail").patch(auth, UserController.updateUserDetail);
userRouter.route("/update-password").patch(auth, UserController.updatePassword);
userRouter
  .route("/forgot-password/:token")
  .get(auth, UserController.forgotPassword);
userRouter.route("/verify-user").get(UserController.verifyUser);

// Admin
userRouter
  .route("/update-role")
  .patch(auth, authRole, UserController.updateRole);
userRouter
  .route("/delete-user")
  .delete(auth, authRole, UserController.deleteUser);
userRouter
  .route("/get-all-user")
  .delete(auth, authRole, UserController.getAllUser);

export default userRouter;
