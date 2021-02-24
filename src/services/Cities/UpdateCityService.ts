import City from "../../models/City";

import UsersRepository from "../../repositories/Users/UsersRepository";
import CitiesRepository from "../../repositories/Cities/CitiesRepository";

interface IRequest {
  user_id: string;
  city_id: string;
  name: string;
  description: string;
}

export default class UpdateCityService {
  public async run({
    user_id,
    city_id,
    name,
    description,
  }: IRequest): Promise<City> {
    const usersRepository = new UsersRepository();
    const citiesRepository = new CitiesRepository();

    const user = await usersRepository.findById(user_id);
    if (!user) throw new Error("Invalid user");

    const city = await citiesRepository.findById(city_id);
    if (!city) throw new Error("This city does not exist");

    city.name = name;
    city.description = description;

    return citiesRepository.save(city);
  }
}
