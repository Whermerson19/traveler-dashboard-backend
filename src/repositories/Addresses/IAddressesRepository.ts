import Address from "../../models/Address";

export interface ICreateAddress {
  zip_code: number;
  street: string;
  neighborhood: string;
  number: string;
}

export interface ICheckDuplicateAddress {
  zip_code: number;
  street: string;
  neighborhood: string;
  number: string;
}

export default interface IAddressesRepository {
  findById(id: string): Promise<Address | undefined>;
  checkDuplicateAddress(
    data: ICheckDuplicateAddress
  ): Promise<Address | undefined>;
  create(data: ICreateAddress): Promise<Address>;
  save(address: Address): Promise<Address>;
}
