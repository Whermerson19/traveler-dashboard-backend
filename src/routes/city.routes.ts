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

cityRouter.use(authorization);

cityRouter.get("/", citiesController.index);

cityRouter.post("/create", uploads.single("image"), citiesController.create);

cityRouter.put(
  "/change-image/:city_id",
  uploads.single("image"),
  updateImageController.create
);

cityRouter.put("/update/:city_id", citiesController.update);

cityRouter.delete("/:city_id", citiesController.delete);

export default cityRouter;
