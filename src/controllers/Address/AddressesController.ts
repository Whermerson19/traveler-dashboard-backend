import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import CreateAddressesService from "../../services/Adresses/CreateAddressesService";

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
}
