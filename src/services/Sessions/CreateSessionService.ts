import User from "../../models/User";
import UsersRespository from "../../repositories/Users/UsersRepository";

import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import authConfig from "../../config/auth";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export default class CreateSessionService {
  public async run({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = new UsersRespository();

    const user = await usersRepository.findByEmail(email);
    if (!user) throw new Error("invalid email/password");

    const comparePassoword = await compare(password, user.password);
    if (!comparePassoword) throw new Error("invalid email/password");

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
