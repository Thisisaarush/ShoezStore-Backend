import { PrismaClient } from "@prisma/client";
import { createJwtToken } from "../utils/jwt.js";
import {
  TForgotPassword,
  TResetPassword,
  TUserInput,
  TUserInputLogin,
  TUpdateCartItems,
  UserCartItem,
} from "../types";
import { encryptPassword, comparePassword } from "../utils/bcrypt.js";
import { CLIENT_URL, NODE_ENV } from "../config/env.js";
import { sendResetEmail } from "../utils/sendResetEmail.js";

const prisma = new PrismaClient();

const heroSliderData = await prisma.herosliders.findMany();
const recommendedData = await prisma.recommendeds.findMany();
const trendingData = await prisma.trendings.findMany();
const categoryData = await prisma.categories.findMany();
const cartItemsData = await prisma.userCart.findMany();

export const resolvers = {
  Query: {
    heroSlider: () => heroSliderData,
    recommended: () => recommendedData,
    trending: () => trendingData,
    category: () => categoryData,
    cartItems: () => cartItemsData,
  },
  Mutation: {
    // update user cart items
    updateUserCartItems: async (_, args: TUpdateCartItems) => {
      let { email, cartItems } = args.user;

      const user = await prisma.userCart.findFirst({ where: { email } });

      if (user) {
        await prisma.userCart.update({
          where: { email },
          data: { items: cartItems },
        });

        return {
          email,
          items: user.items,
          success: true,
          message: "Cart items updated successfully",
        };
      } else {
        return {
          success: false,
          message: "User with this email not found!",
        };
      }
    },

    // register user
    registerUser: async (_, args: TUserInput, { req, res }) => {
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
          data: { name, email, password, token },
        });
        res.cookie("token", token, {
          maxAge: 3 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          secure: NODE_ENV === "production",
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
    loginUser: async (_, args: TUserInputLogin, { req, res }) => {
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
          res.cookie("token", token, {
            maxAge: 3 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: NODE_ENV === "production",
          });

          return {
            success: true,
            message: "Login Successfully!",
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

    // logout User
    logoutUser: async (_, args, { req, res }) => {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      return {
        success: true,
        message: "Logout Successfully",
      };
    },

    // forgot password
    forgotPassword: async (_, args: TForgotPassword, { req }) => {
      let { email } = args.user;

      if (!email) {
        return { message: "Please Provide Email" };
      }

      const user = await prisma.users.findFirst({
        where: { email },
      });

      if (user) {
        const token: string = createJwtToken(email, "3d");
        const resetUrl = CLIENT_URL + req.path + `${token}`;

        await prisma.users.update({
          where: { email },
          data: { token },
        });
        try {
          await sendResetEmail(resetUrl, email);
        } catch (error) {
          return {
            success: false,
            message: "Server Error",
          };
        }

        return {
          email,
          success: true,
          message: "Password Reset Link has been sent to Your Email",
        };
      } else {
        return {
          email,
          success: false,
          message: "User with this Email is not Registered!",
        };
      }
    },

    // reset password
    resetPassword: async (_, args: TResetPassword, { req }) => {
      let { newPassword, confirmPassword } = args.user;
      const [path, token] = req.url.split("/");

      if (!token) {
        return {
          success: false,
          message: "Verify Token Missing!",
        };
      }

      if (!newPassword || !confirmPassword) {
        return { message: "Please Provide New Password" };
      }

      if (newPassword !== confirmPassword) {
        return { message: "Password do not Match" };
      }

      const user = await prisma.users.findFirst({ where: { token } });

      if (user) {
        const newEncryptedPassword = await encryptPassword(newPassword);

        await prisma.users.update({
          where: { token },
          data: { password: newEncryptedPassword, token: "" },
        });

        return {
          success: true,
          message: "Password Reset Successfully",
        };
      } else {
        return {
          success: false,
          message: "Password Reset Failed",
        };
      }
    },
  },
};
