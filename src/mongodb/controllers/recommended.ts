import { recommended } from "../models/recommended.js";

export const recommendedController = async () => {
  const response = await recommended.find({});
  return response;
};
