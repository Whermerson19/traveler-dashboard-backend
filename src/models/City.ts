import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Expose } from "class-transformer";
import Place from "./Place";

@Entity("cities")
export default class City {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: "url_image" })
  getUrlImage(): string | null {
    return this.image ? `http://localhost:3333/files/${this.image}` : null;
  }
}
