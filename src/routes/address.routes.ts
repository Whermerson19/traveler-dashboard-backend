import { Router } from "express";
import authorization from "../middlewares/authorization";
import AddressesController from "../controllers/Address/AddressesController";

const addressRouter = Router();

const addressController = new AddressesController();

addressRouter.post("/create", authorization, addressController.create);

export default addressRouter;
