import Place from "../../models/Place";

export interface ICreatePlace {
  name: string;
  image: string;
  description: string;
  category: string;
  addresses_id: string;
  city_id: string;
}

export default interface IPlacesRepository {
  findByName(name: string): Promise<Place | undefined>;
  findByAddress(address: string): Promise<Place | undefined>;
  findById(id: string): Promise<Place | undefined>;
  create(data: ICreatePlace): Promise<Place>;
  save(place: Place): Promise<Place>;
}
