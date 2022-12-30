import mongoose from "mongoose";

const trendingSchema = new mongoose.Schema({
  name: String,
  uri: String,
  price: Number,
  sizes: [],
});

export const trending = mongoose.model("trending", trendingSchema);
