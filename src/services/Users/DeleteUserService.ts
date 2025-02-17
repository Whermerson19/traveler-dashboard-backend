import User from "../../models/User";

import UsersRepository from "../../repositories/Users/UsersRepository";

interface IRequest {
  user_id: string;
}

export default class DeleteUserService {
  public async run({ user_id }: IRequest): Promise<void> {
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);
    if (!user) throw new Error("This user does not exist");

    await usersRepository.deleteUser(user_id);
  }
}
