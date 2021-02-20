import City from "../../models/City";
import CitiesRepository from "../../repositories/Cities/CitiesRepository";

import StorageProvider from "../../Providers/StorageProvider";

interface IRequest {
  name: string;
  image: string;
  description: string;
}

export default class CreateCityService {
  public async run({ name, image, description }: IRequest): Promise<City> {
    const citiesRepository = new CitiesRepository();
    const storage = new StorageProvider();

    const checkedCity = citiesRepository.findByName(name);
    if (checkedCity) throw new Error("This city is already registered");

    const file = await storage.saveFile(image);

    const city = citiesRepository.create({
      name,
      image: file,
      description,
    });

    return city;
  }
}
