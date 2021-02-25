import { Router } from "express";

import cityRouter from "./city.routes";
import sessionRouter from "./session.routes";
import userRouter from "./user.routes";

const appRouter = Router();

appRouter.use("/users", userRouter);
appRouter.use("/session", sessionRouter);
appRouter.use("/city", cityRouter);

export default appRouter;
