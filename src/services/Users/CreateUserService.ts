import User from "../../models/User";
import UsersRepository from "../../repositories/Users/UsersRepository";

import { hash } from "bcrypt";

interface IRequest {
  username: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async run({ username, email, password }: IRequest): Promise<User> {
    const usersRepository = new UsersRepository();

    const checkedUser = await usersRepository.findByEmail(email);
    if (checkedUser) throw new Error("This email is already in user");

    const hashedPassword = await hash(password, 10);

    const user = await usersRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
