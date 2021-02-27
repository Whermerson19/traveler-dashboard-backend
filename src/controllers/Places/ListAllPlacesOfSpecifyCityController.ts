import { classToClass } from "class-transformer";
import { Request, Response } from "express";

import ListAllPlacesOfSpecifyCity from "../../services/Places/ListAllPlacesOfSpecifyCity";

export default class ListAllPlacesOfSpecifyCityController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const listPlacesService = new ListAllPlacesOfSpecifyCity();

      const user_id = request.user.id;
      const { city_id } = request.params;

      const places = await listPlacesService.run({
        user_id,
        city_id,
      });

      return response.status(200).json(classToClass(places));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
