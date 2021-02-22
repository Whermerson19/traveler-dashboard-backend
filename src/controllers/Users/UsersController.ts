import { Request, Response } from "express";

import CreateUserService from "../../services/Users/CreateUserService";
import UpdateUserService from "../../services/Users/UpdateUserService";
import DeleteUserService from "../../services/Users/DeleteUserService";

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

      return response
        .status(200)
        .json({ success: "Removed user with success" });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const updateUser = new UpdateUserService();

      const user_id = request.user.id;
      const {
        username,
        email,
        current_password,
        new_password,
        confirm_password,
      } = request.body;

      const user = await updateUser.run({
        user_id,
        username,
        email,
        current_password,
        new_password,
        confirm_password,
      });

      return response.status(200).json(classToClass(user));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const deleteUser = new DeleteUserService();
      const user_id = request.user.id;

      const data = await deleteUser.run({
        user_id,
      });

      return response.status(200).json(classToClass(data));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
