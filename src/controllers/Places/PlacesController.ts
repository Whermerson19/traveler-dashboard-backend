import { classToClass } from "class-transformer";
import { Request, Response } from "express";

import CreatePlaceService from "../../services/Places/CreatePlaceService";

export default class PlacesController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const createPlace = new CreatePlaceService();

      const user_id = request.user.id;
      const image = request.file.filename;
      const { city_id, addresses_id } = request.params;
      const { name, description, category } = request.body;

      const place = await createPlace.run({
        user_id,
        city_id,
        addresses_id,
        name,
        description,
        image,
        category,
      });

      return response.status(200).json(classToClass(place));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
