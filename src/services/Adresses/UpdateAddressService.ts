import Address from "../../models/Address";

import UsersRepository from "../../repositories/Users/UsersRepository";
import AddressesRepository from "../../repositories/Addresses/AddressesRepository";

interface IRequest {
  user_id: string;
  address_id: string;
  street: string;
  zip_code: number;
  neighborhood: string;
  number: string;
}

export default class UpdateAddressService {
  public async run({
    user_id,
    address_id,
    street,
    zip_code,
    neighborhood,
    number,
  }: IRequest): Promise<Address> {
    const usersRepository = new UsersRepository();
    const addressesRepository = new AddressesRepository();

    const user = await usersRepository.findById(user_id);
    if (!user) throw new Error("Invalid user");

    const address = await addressesRepository.findById(address_id);
    if (!address) throw new Error("This address does not exist");

    address.street = street;
    address.zip_code = zip_code;
    address.neighborhood = neighborhood;
    address.number = number;

    return addressesRepository.save(address);
  }
}
