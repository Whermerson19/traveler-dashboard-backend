import PlacesRepository from "../../repositories/Places/PlacesRepository";
import UsersRepository from "../../repositories/Users/UsersRepository";
import CitiesRepository from "../../repositories/Cities/CitiesRepository";

interface IRequest {
  user_id: string;
  city_id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  address_id: string;
}

export default class CreatePlaceService {
  public async run({
    user_id,
    city_id,
    name,
    description,
    image,
    category,
    address_id,
  }: IRequest): Promise<void> {
    const placesRepository = new PlacesRepository();
    const usersRepository = new UsersRepository();
    const citiesRepository = new CitiesRepository();

    const user = await usersRepository.findById(user_id);
    if (!user) throw new Error("Invalid user");

    const city = await citiesRepository.findById(city_id);
    if (!city) throw new Error("This city does not exist");
  }
}
