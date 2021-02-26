import City from "../../models/City";

export interface ICreateCity {
  name: string;
  image: string;
  description: string;
}

export default interface ICitiesRepository {
  findById(id: string): Promise<City | undefined>;
  findByName(name: string): Promise<City | undefined>;
  listAllCities(): Promise<City[]>;
  create(data: ICreateCity): Promise<City>;
  save(city: City): Promise<City>;
}
