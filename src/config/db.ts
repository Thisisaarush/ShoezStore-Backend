import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoURI = process.env.MONGO_URI;

mongoose.set("strictQuery", false);

export const connectDB = async (): Promise<void> => {
  await mongoose.connect(mongoURI);
};
