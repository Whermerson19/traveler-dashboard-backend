import Place from "../../models/Place";

import UsersRepository from "../../repositories/Users/UsersRepository";
import PlacesRepository from "../../repositories/Places/PlacesRepository";
import CitiesRepository from "../../repositories/Cities/CitiesRepository";

interface IRequest {
  user_id: string;
  city_id: string;
}

export default class ListAllPlacesOfSpecifyCity {
  public async run({ user_id, city_id }: IRequest): Promise<Place[]> {
    const usersRepository = new UsersRepository();
    const placesRepository = new PlacesRepository();
    const citiesRepository = new CitiesRepository();

    const user = await usersRepository.findById(user_id);
    if (!user) throw new Error("Invalid user");

    const city = await citiesRepository.findById(city_id);
    if (!city) throw new Error("This city does not exist");

    const places = await placesRepository.listAllPlacesOfSpecifyCity(city_id);

    return places;
  }
}
