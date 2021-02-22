import { Router } from "express";

import authorization from "../middlewares/authorization";

import CitiesController from "../controllers/Cities/CitiesController";
import UpdateImageController from "../controllers/Cities/UpdateImageController/UpdateImageController";

import multer from "multer";
import uploadConfig from "../config/upload";

const uploads = multer(uploadConfig);
const cityRouter = Router();

const citiesController = new CitiesController();
const updateImageController = new UpdateImageController();

cityRouter.post(
  "/create",
  authorization,
  uploads.single("image"),
  citiesController.create
);

cityRouter.put(
  "/change-image/:city_id",
  authorization,
  uploads.single("image"),
  updateImageController.create
);

export default cityRouter;
