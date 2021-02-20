import User from "../../models/User";
import UsersRepository from "../../repositories/Users/UsersRepository";

import { hash, compare } from "bcrypt";

interface IRequest {
  user_id: string;
  username?: string;
  email?: string;
  current_password?: string;
  new_password?: string;
  confirm_password?: string;
}

export default class UpdateUserService {
  public async run({
    user_id,
    username,
    email,
    current_password,
    new_password,
    confirm_password,
  }: IRequest): Promise<User> {
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);
    if (!user) throw new Error("Invalid user");

    if (username) user.username = username;
    if (email) user.email = email;

    if (
      current_password &&
      new_password &&
      confirm_password &&
      new_password === confirm_password
    ) {
      const comparePassword = await compare(current_password, user.password);
      if (!comparePassword) throw new Error("Invalid password");

      const hashedPassword = await hash(new_password, 10);
      user.password = hashedPassword;
    }

    if (new_password !== confirm_password)
      throw new Error("Passwords does not match");

    await usersRepository.save(user);

    return user;
  }
}
