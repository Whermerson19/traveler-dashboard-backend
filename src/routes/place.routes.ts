import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";

import authorization from "../middlewares/authorization";

import PlacesController from "../controllers/Places/PlacesController";

const placeRouter = Router();

const upload = multer(uploadConfig);

const placesController = new PlacesController();

placeRouter.use(authorization);

placeRouter.post(
  "/create/city/:city_id/address/:address_id",
  upload.single("image"),
  placesController.create
);

placeRouter.put("/update/:place_id", placesController.update);

export default placeRouter;
