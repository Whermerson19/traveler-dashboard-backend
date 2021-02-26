import { getRepository, Repository } from "typeorm";
import ICitiesRepository, { ICreateCity } from "./ICitiesRepository";

import City from "../../models/City";

export default class CitiesRepository implements ICitiesRepository {
  private ormRepository: Repository<City>;

  constructor() {
    this.ormRepository = getRepository(City);
  }

  public async findById(id: string): Promise<City | undefined> {
    const city = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return city;
  }

  public async findByName(name: string): Promise<City | undefined> {
    const city = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return city;
  }

  public async listAllCities(): Promise<City[]> {
    const cities = await this.ormRepository.find();
    return cities;
  }

  public async create({
    name,
    image,
    description,
  }: ICreateCity): Promise<City> {
    const city = this.ormRepository.create({
      name,
      image,
      description,
    });

    return this.ormRepository.save(city);
  }

  public async save(city: City): Promise<City> {
    return this.ormRepository.save(city);
  }
}
