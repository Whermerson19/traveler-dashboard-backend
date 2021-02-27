import StorageProvider from "../../Providers/StorageProvider";

import UsersRepository from "../../repositories/Users/UsersRepository";
import PlacesRepository from "../../repositories/Places/PlacesRepository";

interface IRequest {
  user_id: string;
  place_id: string;
}

export default class DeletePlaceService {
  public async run({ user_id, place_id }: IRequest): Promise<void> {
    const storageProvider = new StorageProvider();

    const usersRepository = new UsersRepository();
    const placesRepository = new PlacesRepository();

    const user = await usersRepository.findById(user_id);
    if (!user) throw new Error("Invalid user");

    const place = await placesRepository.findById(place_id);
    if (!place) throw new Error("This place does not exist");

    await storageProvider.deleteFile(place.image);
    await placesRepository.delete(place_id);
  }
}
