import mongoose from "mongoose";

const recommendedSchema = new mongoose.Schema({
  name: String,
  uri: String,
  price: Number,
  sizes: [],
});

export const recommended = mongoose.model("recommended", recommendedSchema);
