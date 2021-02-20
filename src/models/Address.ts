import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("addresses")
export default class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("integer")
  zip_code: number;

  @Column()
  street: string;

  @Column()
  neighborhood: string;

  @Column()
  number: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
