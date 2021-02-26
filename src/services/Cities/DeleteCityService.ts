import CitiesRepository from "../../repositories/Cities/CitiesRepository";
import UsersRepository from "../../repositories/Users/UsersRepository";

import StorageProvider from "../../Providers/StorageProvider";

interface IRequest {
  user_id: string;
  city_id: string;
}

export default class DeleteCityService {
  public async run({ user_id, city_id }: IRequest): Promise<void> {
    const storageProvider = new StorageProvider();

    const citiesRepository = new CitiesRepository();
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);
    if (!user) throw new Error("Invalid user");

    const city = await citiesRepository.findById(city_id);
    if (!city) throw new Error("This city does not exist");

    await storageProvider.deleteFile(city.image);

    await citiesRepository.delete(city_id);
  }
}
