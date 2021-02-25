import Place from "../../models/Place";

import PlacesRepository from "../../repositories/Places/PlacesRepository";
import UsersRepository from "../../repositories/Users/UsersRepository";
import CitiesRepository from "../../repositories/Cities/CitiesRepository";
import AddressesRepository from "../../repositories/Addresses/AddressesRepository";

import StorageProvider from "../../Providers/StorageProvider";

interface IRequest {
  user_id: string;
  city_id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  addresses_id: string;
}

export default class CreatePlaceService {
  public async run({
    user_id,
    city_id,
    name,
    description,
    image,
    category,
    addresses_id,
  }: IRequest): Promise<Place> {
    const placesRepository = new PlacesRepository();
    const addressesRepository = new AddressesRepository();
    const usersRepository = new UsersRepository();
    const citiesRepository = new CitiesRepository();

    const storageProvider = new StorageProvider();

    const user = await usersRepository.findById(user_id);
    if (!user) throw new Error("Invalid user");

    const city = await citiesRepository.findById(city_id);
    if (!city) throw new Error("This city does not exist");

    const checkPlaceName = await placesRepository.findByName(name);
    if (checkPlaceName) throw new Error("This place already exist");

    const file = await storageProvider.saveFile(image);

    const place = await placesRepository.create({
      name,
      description,
      image: file,
      category,
      addresses_id,
      city_id,
    });

    return place;
  }
}
