import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

export const resend = new Resend(process.env.RESEND_TOKEN_API_KEY);

export const sender = "onboarding@resend.dev";

