import nodemailer from "nodemailer";
import dotenv from "dotenv";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");


dotenv.config();

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },

    family: 4,
});

export const sender = process.env.EMAIL_USER;