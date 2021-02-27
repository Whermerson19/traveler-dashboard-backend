import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import CreateAddressesService from "../../services/Adresses/CreateAddressesService";
import UpdateAddressService from "../../services/Adresses/UpdateAddressService";
import DeleteAddressesService from "../../services/Adresses/DeleteAddressesService";

export default class AddressesController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const createAddress = new CreateAddressesService();

      const user_id = request.user.id;
      const { street, zip_code, neighborhood, number } = request.body;

      const address = await createAddress.run({
        user_id,
        zip_code,
        street,
        number,
        neighborhood,
      });

      return response.status(200).json(classToClass(address));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const updateAddress = new UpdateAddressService();

      const user_id = request.user.id;
      const { address_id } = request.params;
      const { street, zip_code, neighborhood, number } = request.body;

      const address = await updateAddress.run({
        user_id,
        address_id,
        zip_code,
        street,
        number,
        neighborhood,
      });

      return response.status(200).json(classToClass(address));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const deleteAddress = new DeleteAddressesService();

      const user_id = request.user.id;
      const { address_id } = request.params;

      await deleteAddress.run({
        user_id,
        address_id,
      });

      return response
        .status(200)
        .json({ success: "address deleted with success" });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
