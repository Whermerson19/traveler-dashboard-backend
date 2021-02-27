import Place from "../../models/Place";

import UsersRepository from "../../repositories/Users/UsersRepository";
import PlacesRepository from "../../repositories/Places/PlacesRepository";

interface IRequest {
  user_id: string;
  place_id: string;
  name: string;
  description: string;
  category: string;
}

export default class UpdatePlaceService {
  public async run({
    user_id,
    place_id,
    name,
    description,
    category,
  }: IRequest): Promise<Place> {
    const usersRepository = new UsersRepository();
    const placesRepository = new PlacesRepository();

    const user = await usersRepository.findById(user_id);
    if (!user) throw new Error("Invalid user");

    const place = await placesRepository.findById(place_id);
    if (!place) throw new Error("This place does not exist");

    place.name = name;
    place.description = description;
    place.category = category;

    return placesRepository.save(place);
  }
}
