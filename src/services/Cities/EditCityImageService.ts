import City from "../../models/City";

import UsersRepository from "../../repositories/Users/UsersRepository";
import CitiesRepository from "../../repositories/Cities/CitiesRepository";

import StorageProvider from "../../Providers/StorageProvider";

interface IRequest {
  user_id: string;
  city_id: string;
  image: string;
}

export default class EditCityImageService {
  public async run({ user_id, city_id, image }: IRequest): Promise<City> {
    const usersRepository = new UsersRepository();
    const citiesRepository = new CitiesRepository();

    const storageProvider = new StorageProvider();

    const user = await usersRepository.findById(user_id);
    if (!user) throw new Error("Invalid user");

    const city = await citiesRepository.findById(city_id);
    if (!city) throw new Error("This city does not exist");

    await storageProvider.deleteFile(city.image);
    const fileName = await storageProvider.saveFile(image);

    city.image = fileName;

    return citiesRepository.save(city);
  }
}
