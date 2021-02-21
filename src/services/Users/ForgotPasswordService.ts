import path from "path";

import UsersRepository from "../../repositories/Users/UsersRepository";
import UserTokenRepository from "../../repositories/UserToken/UserTokenRepository";
import MailProvider from "../../Providers/MailProvider";

export default class ForgotPasswordService {
  public async run(email: string): Promise<void> {
    const usersRepository = new UsersRepository();
    const usersTokenRepository = new UserTokenRepository();
    const mailProvider = new MailProvider();

    const user = await usersRepository.findByEmail(email);
    if (!user) throw new Error("This email does not exists");

    const template = path.resolve(
      __dirname,
      "..",
      "..",
      "Views",
      "forgotPassword.hbs"
    );

    const userToken = await usersTokenRepository.create(user.id);
    console.log(userToken.token);

    await mailProvider.sendMail({
      to: {
        name: user.username,
        address: user.email,
      },
      subject: "[Equipe Traveler] - Email de recuperação de senha",
      template: {
        file: template,
        variables: {
          name: user.username,
          link: `http://localhost:3000/reset-password?token=${userToken.token}`,
        },
      },
    });
  }
}
