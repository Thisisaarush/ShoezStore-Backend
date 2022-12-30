import { trending } from "../models/trending.js";

export const trendingController = async () => {
  const response = await trending.find({});
  return response;
};
