import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailSenderService {
  private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'buddy11@ethereal.email',
        pass: 'tJwYusHSuXYjQpZmw8',
      },
    });
  }

  async sendEmail(email: string, subject: string, message: string) {
    const mailOptions = {
      from: 'buddy11@ethereal.email',
      to: 'viniciusdsv93@gmail.com',
      subject,
      text: message,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
