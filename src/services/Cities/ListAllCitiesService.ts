import City from "../../models/City";

import CitiesRepository from "../../repositories/Cities/CitiesRepository";
import UsersRepository from "../../repositories/Users/UsersRepository";

interface IRequest {
  user_id: string;
}

export default class ListAllCitiesService {
  public async run({ user_id }: IRequest): Promise<City[]> {
    const citiesRepository = new CitiesRepository();
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);
    if (!user) throw new Error("Invalid user");

    const cities = await citiesRepository.listAllCities();

    return cities;
  }
}
