import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from "typeorm";

import Category from "../models/Category";
import Address from "./Address";
import City from "./City";

@Entity("places")
export default class Place {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  description: string;

  // uma categoria pode ter varios locais, mas um local somente pode ter uma categoria
  @OneToMany(() => Category, (category) => category.place, { eager: true })
  @JoinColumn({ name: "category_id" })
  categories: Category;

  @Column()
  category_id: string;

  // um local pode ter somente um endereço e um endereço pode ter somente um local
  @OneToOne(() => Address)
  @JoinColumn({ name: "address_id" })
  address: Address;

  @Column()
  addresses_id: string;

  // uma cidade pode ter varios locais mas um local so pode ter uma cidade
  @OneToMany(() => City, (city) => city.place, { eager: true })
  @JoinColumn({ name: "city_id" })
  city: City;

  @Column()
  city_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
