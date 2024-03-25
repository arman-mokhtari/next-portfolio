"use server";

import { htmlTemplate } from "@/backend/views/contactHtml";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "0", 10),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function sendContactUsEmail(params: any) {
  const { values } = params;
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.MY_EMAIL,
      subject: "پیام از طرف کاربر",
      html: htmlTemplate({
        name: values.fullName,
        email: values.email,
        phoneNumber: values.phone,
        message: values.message
      }),
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
}
