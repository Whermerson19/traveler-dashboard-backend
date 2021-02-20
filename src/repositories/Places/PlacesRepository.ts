import { getRepository, Repository } from "typeorm";

import Place from "../../models/Place";
import IPlacesRepository, { ICreatePlace } from "./IPlacesRepository";

export default class PlacesRepository implements IPlacesRepository {
  private ormRepository: Repository<Place>;
  constructor() {
    this.ormRepository = getRepository(Place);
  }

  public async findById(id: string): Promise<Place | undefined> {
    const place = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return place;
  }

  public async findByAddress(address: string): Promise<Place | undefined> {
    const place = await this.ormRepository.findOne({
      where: {
        address,
      },
    });

    return place;
  }

  public async findByName(name: string): Promise<Place | undefined> {
    const place = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return place;
  }

  public async create({
    name,
    image,
    description,
    city_id,
    category_id,
    address_id,
  }: ICreatePlace): Promise<Place> {
    const place = this.ormRepository.create({
      name,
      image,
      description,
      city_id,
      category_id,
      addresses_id: address_id,
    });

    return this.ormRepository.save(place);
  }

  public async save(place: Place): Promise<Place> {
    return this.ormRepository.save(place);
  }
}
