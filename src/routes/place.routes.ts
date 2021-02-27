import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";

import authorization from "../middlewares/authorization";

import PlacesController from "../controllers/Places/PlacesController";
import ListAllPlacesOfSpecifyCityController from "../controllers/Places/ListAllPlacesOfSpecifyCityController";
import ChangePlaceImageController from "../controllers/Places/ChangePlaceImageController";

const placeRouter = Router();

const upload = multer(uploadConfig);

const placesController = new PlacesController();
const changePlaceImageController = new ChangePlaceImageController();
const listAllPlacesOfSpecifyCityController = new ListAllPlacesOfSpecifyCityController();

placeRouter.use(authorization);

placeRouter.get("/city/:city_id", listAllPlacesOfSpecifyCityController.index);

placeRouter.post(
  "/create/city/:city_id/address/:addresses_id",
  upload.single("image"),
  placesController.create
);

placeRouter.put("/update/:place_id", placesController.update);

placeRouter.patch(
  "/change-image/:place_id",
  upload.single("image"),
  changePlaceImageController.update
);

placeRouter.delete("/delete/:place_id", placesController.delete);

export default placeRouter;
