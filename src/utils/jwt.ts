import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export const createJwtToken = (key: string, expiry: string): string => {
  return jwt.sign({ id: key }, JWT_SECRET, { expiresIn: expiry });
};
