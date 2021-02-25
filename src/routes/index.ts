import { Router } from "express";

import addressRouter from "./address.routes";
import cityRouter from "./city.routes";
import placeRouter from "./place.routes";
import sessionRouter from "./session.routes";
import userRouter from "./user.routes";

const appRouter = Router();

appRouter.use("/users", userRouter);
appRouter.use("/session", sessionRouter);
appRouter.use("/city", cityRouter);
appRouter.use("/address", addressRouter);
appRouter.use("/place", placeRouter);

export default appRouter;
