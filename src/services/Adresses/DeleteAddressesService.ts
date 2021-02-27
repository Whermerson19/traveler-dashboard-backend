import UsersRepository from "../../repositories/Users/UsersRepository";
import AddressesRepository from "../../repositories/Addresses/AddressesRepository";

interface IRequest {
  user_id: string;
  address_id: string;
}

export default class DeleteAddressesService {
  public async run({ user_id, address_id }: IRequest): Promise<void> {
    const usersRepository = new UsersRepository();
    const addressesRepository = new AddressesRepository();

    const user = await usersRepository.findById(user_id);
    if (!user) throw new Error("Invalid user");

    const address = await addressesRepository.findById(address_id);
    if (!address) throw new Error("This address does not exist");

    await addressesRepository.delete(address_id);
  }
}
