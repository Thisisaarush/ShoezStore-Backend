import mongoose from "mongoose";

const heroSliderSchema = new mongoose.Schema({
  uri: String,
});

export const heroslider = mongoose.model("heroslider", heroSliderSchema);
