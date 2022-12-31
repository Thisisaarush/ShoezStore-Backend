import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const heroSliderData = await prisma.herosliders.findMany();
const recommendedData = await prisma.recommendeds.findMany();
const trendingData = await prisma.trendings.findMany();
const categoryData = await prisma.categories.findMany();

export const resolvers = {
  Query: {
    heroSlider: () => heroSliderData,
    recommended: () => recommendedData,
    trending: () => trendingData,
    category: () => categoryData,
  },
};
