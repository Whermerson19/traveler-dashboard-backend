import { classToClass } from "class-transformer";
import { Request, Response } from "express";

import ResetPasswordService from "../../services/Users/ResetPasswordService";

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const reset_password = new ResetPasswordService();
      const { password } = request.body;
      const { token } = request.params;

      const user = await reset_password.run({
        token,
        password,
      });

      return response.status(200).json(classToClass(user));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
