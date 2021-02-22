import { Router } from "express";

import UsersController from "../controllers/Users/UsersController";
import SendForgotPasswordMailController from "../controllers/ResetPasswordController/SendForgotPasswordMailController";
import ResetPasswordController from "../controllers/ResetPasswordController/ResetPasswordController";

import auth from "../middlewares/authorization";

const userRouter = Router();

const usersController = new UsersController();
const sendPasswordController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

userRouter.post("/create", usersController.create);
userRouter.put("/update", auth, usersController.update);
userRouter.delete("/delete", auth, usersController.delete);

userRouter.post("/forgot-password", sendPasswordController.create);
userRouter.post("/reset-password/:token", resetPasswordController.create);

export default userRouter;
