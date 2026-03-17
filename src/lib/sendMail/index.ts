import nodemailer from "nodemailer";
import { codePlainText, paidPlainText } from "./plainText";
import { codeTemplate, paidTemplate } from "./template";

if (!process.env.GMAIL_PASSWORD) { 
  throw new Error("GMAIL_PASSWORD is not defined in .env");
}
if (!process.env.GMAIL_USER) { 
  throw new Error("GMAIL_USER is not defined in .env");
}

// Configuracion del transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
})

export enum MailType {
  code,
  paid
}

type SendMailProps = {
  type: MailType;
  to: string[];
  code?: number;
};

const buildMailOptions = ({ type, to, code }: SendMailProps) => {
  const base = {
    from: {
      name: "crpl e-commerce",
      address: process.env.GMAIL_USER
    },
    to
  };

  switch (type) {
    case MailType.code:
      if (!code) 
        throw new Error("Missing code");
      return {
        ...base,
        subject: "Tu código de verificación",
        text: codePlainText(code),
        html: codeTemplate(code),
      };

    case MailType.paid:
      return {
        ...base,
        subject: "Pago confirmado",
        text: paidPlainText(),
        html: paidTemplate(),
      };

    default:
      throw new Error("Invalid mail type");
  }
};
export const sendMail = async ({ type, to, code }: SendMailProps) => {
  try {
    const mailOptions = buildMailOptions({ type, to, code });
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};