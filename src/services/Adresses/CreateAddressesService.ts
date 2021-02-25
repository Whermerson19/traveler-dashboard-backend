import Address from "../../models/Address";

import UsersRepository from "../../repositories/Users/UsersRepository";
import PlacesRepository from "../../repositories/Places/PlacesRepository";
import AddressesRepository from "../../repositories/Addresses/AddressesRepository";

interface IRequest {
  user_id: string;
  zip_code: number;
  street: string;
  neighborhood: string;
  number: string;
}

export default class CreateAddressesService {
  public async run({
    user_id,
    zip_code,
    street,
    neighborhood,
    number,
  }: IRequest): Promise<Address> {
    const usersRepository = new UsersRepository();
    const placesRepository = new PlacesRepository();
    const addressesRepository = new AddressesRepository();

    const user = await usersRepository.findById(user_id);
    if (!user) throw new Error("Ivalid User");

    const checkDuplicateAddress = await addressesRepository.checkDuplicateAddress(
      {
        zip_code,
        street,
        neighborhood,
        number,
      }
    );

    if (checkDuplicateAddress)
      throw new Error("This address is already in use");

    const address = await addressesRepository.create({
      zip_code,
      street,
      neighborhood,
      number,
    });

    return address;
  }
}
