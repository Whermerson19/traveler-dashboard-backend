import User from "../../models/User";

export interface ICreateUser {
  username: string;
  email: string;
  password: string;
}

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findAllUsers(): Promise<User[]>;
  deleteUser(user_id: string): Promise<void>;
  findByUsername(username: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUser): Promise<User>;
  save(user: User): Promise<User>;
}
