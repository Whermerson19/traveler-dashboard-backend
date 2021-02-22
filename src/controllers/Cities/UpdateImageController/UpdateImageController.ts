import { Request, Response } from "express";

import EditCityImageService from "../../../services/Cities/EditCityImageService";
import { classToClass } from "class-transformer";

export default class UpdateImageController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const updateImage = new EditCityImageService();

      const image = request.file.filename;
      const user_id = request.user.id;
      const { city_id } = request.params;

      const city = await updateImage.run({
        image,
        user_id,
        city_id,
      });

      return response.status(200).json(classToClass(city));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
