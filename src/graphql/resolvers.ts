import { PrismaClient } from "@prisma/client";
import { createJwtToken } from "../utils/jwt.js";
import { TUserInput } from "../types";
import { encryptPassword } from "../utils/bcrypt.js";

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
  Mutation: {
    registerUser: async (_, args: TUserInput) => {
      let { name, email, password } = args.user;

      if (!name || !email || !password)
        return { message: "Please Provide Name, Email & Password" };

      const userExists = await prisma.users.findFirst({
        where: { email },
      });

      const token: string = createJwtToken(email, "3d");
      await encryptPassword(password).then((hash) => (password = hash));

      const response = {
        success: true,
        message: "User is Successfully Registered",
        name,
        email,
        token,
      };

      if (!userExists) {
        await prisma.users.create({
          data: { name, email, password },
        });

        return response;
      } else {
        return { success: false, message: "User Already Exists", email };
      }
    },
  },
};
