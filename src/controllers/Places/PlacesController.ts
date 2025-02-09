import { classToClass } from "class-transformer";
import { Request, Response } from "express";

import CreatePlaceService from "../../services/Places/CreatePlaceService";
import UpdatePlaceService from "../../services/Places/UpdatePlaceService";
import DeletePlaceService from "../../services/Places/DeletePlaceService";

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

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const updatePlace = new UpdatePlaceService();

      const user_id = request.user.id;
      const { place_id } = request.params;
      const { name, description, category } = request.body;

      const place = await updatePlace.run({
        user_id,
        place_id,
        name,
        description,
        category,
      });

      return response.status(200).json(classToClass(place));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const deletePlace = new DeletePlaceService();

      const user_id = request.user.id;
      const { place_id } = request.params;

      await deletePlace.run({
        user_id,
        place_id,
      });

      return response
        .status(200)
        .json({ success: "place deleted with success" });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
