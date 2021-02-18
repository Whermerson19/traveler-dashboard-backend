import { Request, Response } from "express";

import CreateUserService from "../../services/Users/CreateUserService";
import { classToClass } from "class-transformer";

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const createuser = new CreateUserService();
      const { username, email, password } = request.body;

      const user = await createuser.run({
        username,
        email,
        password,
      });

      return response.status(200).json(classToClass(user));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
