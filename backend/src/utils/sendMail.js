import nodemailer from "nodemailer";
import { config } from "./index.js";
import { User } from "../models/index.js";
import { hash } from "bcrypt";

export default async function sendMail(user_id, email, emailType) {
  try {
    const hashToken = await hash(user_id.toString(), 12);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(user_id, {
        $set: {
          verifiedToken: hashToken,
          verifiedTokenExpire: Date.now() + 10 * 60 * 1000,
        },
      });
    } else {
      // Todo forgot Password
      //await User.findByIdAndUpdate(user_id);
    }
    const transport = nodemailer.createTransport({
      host: config.MAIL_HOST,
      port: config.MAIL_PORT,
      auth: {
        user: config.MAIL_USER,
        pass: config.MAIL_PASS,
      },
    });

    const mailOption = {
      from: config.MAIL_USER,
      to: email,
      subject: emailType === "VERITY" ? "Verify Real User" : "Reset Password",
      text: "text",
      html: `
      <a href="${config.DOMAIN_NAME}/users/verify-user?token=${hashToken}">Here</a>
      <br/>
      <p>${config.DOMAIN_NAME}/users/verify-user?token=${hashToken}</p>`,
    };
    return transport.sendMail(mailOption);
  } catch (error) {
    throw new Error(error.message);
  }
}