import { Router } from "express";

import UsersController from "../controllers/Users/UsersController";

import auth from "../middlewares/authorization";

const userRouter = Router();

const usersController = new UsersController();

userRouter.post("/create", usersController.create);
userRouter.put("/update", auth, usersController.update);

export default userRouter;
