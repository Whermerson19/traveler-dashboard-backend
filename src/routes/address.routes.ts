import { Router } from "express";
import authorization from "../middlewares/authorization";
import AddressesController from "../controllers/Address/AddressesController";

const addressRouter = Router();

const addressController = new AddressesController();

addressRouter.use(authorization);

addressRouter.post("/create", addressController.create);
addressRouter.put("/update/:address_id", addressController.update);
addressRouter.delete("/delete/:address_id", addressController.delete);

export default addressRouter;
