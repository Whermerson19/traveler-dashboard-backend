import { Router } from "express";

import sessionRouter from "./session.routes";
import userRouter from "./user.routes";

const appRouter = Router();

appRouter.use("/users", userRouter);
appRouter.use("/session", sessionRouter);

export default appRouter;
