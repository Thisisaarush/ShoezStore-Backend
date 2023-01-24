//seed data for local mongodb

import { PrismaClient } from "@prisma/client";
import {
  HeroSlider,
  Recommended,
  Trending,
  Category,
} from "./seedData/data.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();

  //seeding
  await prisma.herosliders.deleteMany();
  await prisma.recommendeds.deleteMany();
  await prisma.trendings.deleteMany();
  await prisma.categories.deleteMany();

  await prisma.herosliders.createMany({
    data: HeroSlider,
  });
  await prisma.recommendeds.createMany({
    data: Recommended,
  });
  await prisma.trendings.createMany({
    data: Trending,
  });
  await prisma.categories.createMany({
    data: Category,
  });

  console.log("🌱 Seeding of Database is Successful");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
