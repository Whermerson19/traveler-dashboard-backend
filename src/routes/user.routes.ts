import { Router } from "express";
import UsersController from "../controllers/Users/UsersController";

const userRouter = Router();

const usersController = new UsersController();

userRouter.post("/create", usersController.create);

export default userRouter;
