import { classToClass } from "class-transformer";
import { Request, Response } from "express";

import ChangePlaceImageService from "../../../services/Places/ChangePlaceImageService";

export default class ChangePlaceImageController {
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const changePlaceImage = new ChangePlaceImageService();

      const user_id = request.user.id;
      const { place_id } = request.params;
      const image = request.file.filename;

      const place = await changePlaceImage.run({
        user_id,
        place_id,
        image,
      });

      return response.status(200).json(classToClass(place));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
