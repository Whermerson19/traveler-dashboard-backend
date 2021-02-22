import { getRepository, Repository } from "typeorm";

import IUsersRepository, { ICreateUser } from "./IUsersRepository";
import User from "../../models/User";

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;
  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAllUsers(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async deleteUser(user_id: string): Promise<void> {
    await this.ormRepository.delete({
      id: user_id,
    });
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        username,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async create({
    username,
    email,
    password,
  }: ICreateUser): Promise<User> {
    const user = this.ormRepository.create({
      username,
      email,
      password,
    });

    return this.ormRepository.save(user);
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
