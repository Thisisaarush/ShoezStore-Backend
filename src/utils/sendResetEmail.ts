import nodemailer from "nodemailer";
import {
  MAIL_TRAP_HOST,
  MAIL_TRAP_PORT,
  MAIL_TRAP_USER,
  MAIL_TRAP_PASS,
} from "../config/env.js";

export const sendResetEmail = async (resetUrl, email) => {
  let transporter = nodemailer.createTransport({
    host: MAIL_TRAP_HOST,
    port: MAIL_TRAP_PORT,
    auth: {
      user: MAIL_TRAP_USER,
      pass: MAIL_TRAP_PASS,
    },
  });

  await transporter.sendMail({
    from: '"Aarush" <at@gmail.com>',
    to: `${email}`,
    subject: "Password Reset for ShoezStore",
    text: "Please use this link to reset your current Password",
    html: `<a href=${resetUrl}>Reset Your Password</a>`,
  });
};
