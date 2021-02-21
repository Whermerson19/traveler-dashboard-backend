import { getRepository, Repository } from "typeorm";

import User_Token from "../../models/User_Token";
import IUserTokenRepository from "./IUserTokenRepositoy";

export default class UserTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<User_Token>;

  constructor() {
    this.ormRepository = getRepository(User_Token);
  }

  public async findByToken(token: string): Promise<User_Token | undefined> {
    const user_token = await this.ormRepository.findOne({
      where: {
        token,
      },
    });

    return user_token;
  }

  public async create(user_id: string): Promise<User_Token> {
    const user_token = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(user_token);
    return user_token;
  }
}
