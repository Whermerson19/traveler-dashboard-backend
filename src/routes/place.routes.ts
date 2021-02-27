import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";

import authorization from "../middlewares/authorization";

import PlacesController from "../controllers/Places/PlacesController";
import ChangePlaceImageController from "../controllers/Places/ChangePlaceImageController";

const placeRouter = Router();

const upload = multer(uploadConfig);

const placesController = new PlacesController();
const changePlaceImageController = new ChangePlaceImageController();

placeRouter.use(authorization);

placeRouter.post(
  "/create/city/:city_id/address/:address_id",
  upload.single("image"),
  placesController.create
);

placeRouter.put("/update/:place_id", placesController.update);

placeRouter.put(
  "/change-image/:place_id",
  upload.single("image"),
  changePlaceImageController.update
);

export default placeRouter;
