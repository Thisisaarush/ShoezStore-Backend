import { heroslider } from "../models/heroSlider.js";

export const heroSliderController = async () => {
  const response = await heroslider.find({});
  return response;
};
