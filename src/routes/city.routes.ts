import { Router } from "express";

import authorization from "../middlewares/authorization";

import CitiesController from "../controllers/Cities/CitiesController";

import multer from "multer";
import uploadConfig from "../config/upload";

const cityRouter = Router();

const citiesController = new CitiesController();
const uploads = multer(uploadConfig);

cityRouter.post(
  "/create",
  authorization,
  uploads.single("image"),
  citiesController.create
);

export default cityRouter;
