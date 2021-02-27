import { Repository, getRepository } from "typeorm";

import Address from "../../models/Address";

import IAddressesRepository, {
  ICreateAddress,
  ICheckDuplicateAddress,
} from "./IAddressesRepository";

export default class AddressesRepository implements IAddressesRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async findById(id: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne({
      id,
    });

    return address;
  }

  public async checkDuplicateAddress({
    zip_code,
    street,
    neighborhood,
    number,
  }: ICheckDuplicateAddress): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne({
      where: {
        zip_code,
        street,
        neighborhood,
        number,
      },
    });

    return address;
  }

  public async create({
    zip_code,
    street,
    neighborhood,
    number,
  }: ICreateAddress): Promise<Address> {
    const address = this.ormRepository.create({
      zip_code,
      street,
      neighborhood,
      number,
    });

    return this.ormRepository.save(address);
  }

  public async save(address: Address): Promise<Address> {
    return this.ormRepository.save(address);
  }

  public async delete(address_id: string): Promise<void> {
    await this.ormRepository.delete({
      id: address_id,
    });
  }
}
