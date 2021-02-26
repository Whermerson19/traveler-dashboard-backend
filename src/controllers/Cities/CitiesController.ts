import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import CreateCityService from "../../services/Cities/CreateCityService";
import UpdateCityService from "../../services/Cities/UpdateCityService";
import ListAllCitiesService from "../../services/Cities/ListAllCitiesService";
import DeleteCityService from "../../services/Cities/DeleteCityService";

export default class CitiesController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const listAllCities = new ListAllCitiesService();
      const user_id = request.user.id;

      const cities = await listAllCities.run({
        user_id,
      });

      return response.status(200).json(classToClass(cities));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

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

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const updateCity = new UpdateCityService();

      const user_id = request.user.id;
      const { name, description } = request.body;
      const { city_id } = request.params;

      const city = await updateCity.run({
        user_id,
        city_id,
        name,
        description,
      });

      return response.status(200).json(classToClass(city));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const deleteCity = new DeleteCityService();

      const user_id = request.user.id;
      const { city_id } = request.params;

      await deleteCity.run({
        user_id,
        city_id,
      });

      return response.status(200).json({ sucess: "Deleted city with success" });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
