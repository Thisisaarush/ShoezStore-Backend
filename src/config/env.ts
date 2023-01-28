import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const NODE_ENV = process.env.NODE_ENV;

export const MAIL_TRAP_HOST = process.env.MAIL_TRAP_HOST;
export const MAIL_TRAP_PORT = process.env.MAIL_TRAP_PORT;
export const MAIL_TRAP_USER = process.env.MAIL_TRAP_USER;
export const MAIL_TRAP_PASS = process.env.MAIL_TRAP_PASS;

export const CLIENT_URL = process.env.CLIENT_URL;

export const RAZORPAY_ID = process.env.RAZORPAY_ID;
export const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET;
