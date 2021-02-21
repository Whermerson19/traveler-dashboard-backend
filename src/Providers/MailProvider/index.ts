import nodemailer from "nodemailer";

import MailTemplateProvider, {
  IParseMailTemplate,
} from "../MailTemplateProvider";

interface IMailData {
  name: string;
  address: string;
}

interface ISendMailData {
  to: IMailData;
  from?: IMailData;
  subject: string;
  template: IParseMailTemplate;
}

export default class MailProvider {
  public async sendMail({
    to,
    from,
    subject,
    template,
  }: ISendMailData): Promise<void> {
    const mailTemplate = new MailTemplateProvider();

    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
      tls: { rejectUnauthorized: false },
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || "Equipe Traveler",
        address: from?.address || "traveler_dashboard@traveler.com",
      },
      to: {
        name: to.name,
        address: to.address,
      },
      subject,
      html: await mailTemplate.parse(template),
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}
