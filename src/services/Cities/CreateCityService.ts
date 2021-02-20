import City from "../../models/City";
import CitiesRepository from "../../repositories/Cities/CitiesRepository";
import UsersRepository from "../../repositories/Users/UsersRepository";

import StorageProvider from "../../Providers/StorageProvider";

interface IRequest {
  name: string;
  image: string;
  description: string;
  user_id: string;
}

export default class CreateCityService {
  public async run({
    name,
    image,
    description,
    user_id,
  }: IRequest): Promise<City> {
    const citiesRepository = new CitiesRepository();
    const usersRepository = new UsersRepository();
    const storage = new StorageProvider();

    const user = await usersRepository.findById(user_id);
    if (!user) throw new Error("Invalid user");

    const checkedCity = await citiesRepository.findByName(name);
    if (checkedCity) throw new Error("This city is already registered");

    const file = await storage.saveFile(image);

    const city = await citiesRepository.create({
      name,
      image: file,
      description,
    });

    return city;
  }
}
