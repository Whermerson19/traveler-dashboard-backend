import User_Token from "../../models/User_Token";

export default interface IUserTokenRepository {
  findByToken(token: string): Promise<User_Token | undefined>;
  create(user_id: string): Promise<User_Token>;
}
