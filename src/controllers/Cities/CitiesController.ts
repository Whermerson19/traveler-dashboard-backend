import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import CreateCityService from "../../services/Cities/CreateCityService";

export default class CitiesController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const createCities = new CreateCityService();

      const user_id = request.user.id;
      const image = request.file.filename;
      const { name, description } = request.body;

      const city = await createCities.run({
        name,
        image,
        description,
        user_id,
      });

      return response.status(200).json(classToClass(city));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
