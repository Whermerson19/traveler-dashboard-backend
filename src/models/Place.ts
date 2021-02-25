import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from "typeorm";

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

  @Column()
  category: string;

  // um local pode ter somente um endereço e um endereço pode ter somente um local
  @Column()
  addresses_id: string;

  @OneToOne(() => Address, { eager: true })
  @JoinColumn({ name: "addresses_id" })
  address: Address;

  // vários locais para uma mesma cidade
  @ManyToOne(() => City, { eager: true })
  @JoinColumn({ name: "city_id" })
  city: City;

  @Column()
  city_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
