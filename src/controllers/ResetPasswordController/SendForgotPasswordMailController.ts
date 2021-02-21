import { Request, Response } from "express";

import ForgotPasswordService from "../../services/Users/ForgotPasswordService";

export default class SendForgotPasswordMailController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const forgotPassword = new ForgotPasswordService();
      const { email } = request.body;

      await forgotPassword.run(email);

      return response
        .status(200)
        .json({ success: "Email de recuperação de senha enviado!" });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
