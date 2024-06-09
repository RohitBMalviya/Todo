import { Router } from "express";
import { UserController } from "../controller/index.js";
import { auth, authRole } from "../middleware/index.js";

const userRouter = Router();

userRouter.route("/login").post(UserController.login);
userRouter.route("/signup").post(UserController.signUp);
userRouter.route("/get-detail").post(UserController.getUserDetail);
userRouter.route("/logout").post(auth, UserController.logout);
userRouter.route("/update-detail").put(auth, UserController.updateUserDetail);
userRouter.route("/update-password").patch(auth, UserController.updatePassword);
userRouter.route("/forgot-password/:token").get(UserController.forgotPassword);
userRouter.route("/verify-user").get(UserController.verifyUser);

// Admin
userRouter.route("/update-role").patch(authRole, UserController.updateRole);
userRouter.route("/delete-user").delete(UserController.deleteUser);
userRouter.route("/get-all-user").delete(UserController.getAllUser);

export default userRouter;
