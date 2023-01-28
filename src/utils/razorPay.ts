import Razorpay from "razorpay";
import { RAZORPAY_ID, RAZORPAY_SECRET } from "../config/env.js";

export const razorpayInstance = new Razorpay({
  key_id: RAZORPAY_ID,
  key_secret: RAZORPAY_SECRET,
});
