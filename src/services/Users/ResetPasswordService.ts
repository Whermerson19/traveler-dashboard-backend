import User from "../../models/User";

import UsersRepository from "../../repositories/Users/UsersRepository";
import UserTokenRepository from "../../repositories/UserToken/UserTokenRepository";

import { hash } from "bcrypt";

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public async run({ token, password }: IRequest): Promise<User> {
    const usersRepository = new UsersRepository();
    const usersTokenRepository = new UserTokenRepository();

    const user_token = await usersTokenRepository.findByToken(token);
    if (!user_token) throw new Error("This token does not exist");

    const user = await usersRepository.findById(user_token.user_id);
    if (!user) throw new Error("Invalid user");

    const createdAtToken = user_token.created_at;

    if (new Date(Date.now()).getHours() - createdAtToken.getHours() > 2)
      throw new Error("Epired token");

    user.password = await hash(password, 10);

    return usersRepository.save(user);
  }
}
