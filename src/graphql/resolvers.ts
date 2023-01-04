import { PrismaClient } from "@prisma/client";
import { createJwtToken } from "../utils/jwt.js";
import { TUserInput, TUserInputLogin } from "../types";
import { encryptPassword, comparePassword } from "../utils/bcrypt.js";

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
    // register user
    registerUser: async (_, args: TUserInput) => {
      let { name, email, password } = args.user;

      if (!name || !email || !password)
        return { message: "Please Provide Name, Email & Password" };

      const user = await prisma.users.findFirst({
        where: { email },
      });

      if (!user) {
        const token: string = createJwtToken(email, "3d");
        await encryptPassword(password).then((hash) => (password = hash));
        await prisma.users.create({
          data: { name, email, password },
        });

        return {
          success: true,
          message: "User is Successfully Registered!",
          name,
          email,
          token,
        };
      } else {
        return {
          success: false,
          message: "User Already Exists, Please Login!",
          email,
        };
      }
    },

    // login user
    loginUser: async (_, args: TUserInputLogin) => {
      let { email, password } = args.user;

      if (!email || !password) {
        return { message: "Please Provide Email & Password" };
      }

      const user = await prisma.users.findFirst({
        where: { email },
      });

      if (user) {
        const token: string = createJwtToken(email, "3d");
        const validUser = await comparePassword(password, user.password);

        if (validUser) {
          return {
            success: true,
            message: "LogIn Successfull!",
            name: user.name,
            email,
            token,
          };
        } else {
          return {
            email,
            success: false,
            message: "Wrong Password!",
          };
        }
      } else {
        return {
          email,
          success: false,
          message: "User With This Email is not Registered, Please Register!",
        };
      }
    },
  },
};
