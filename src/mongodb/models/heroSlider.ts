import mongoose from "mongoose";

const heroSliderSchema = new mongoose.Schema({
  name: String,
  uri: String,
  price: Number,
  sizes: [],
});

export const heroslider = mongoose.model("heroslider", heroSliderSchema);
