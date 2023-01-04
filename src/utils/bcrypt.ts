import bcrypt from "bcryptjs";

export const encryptPassword = async (
  userPassword: string
): Promise<string> => {
  return await bcrypt.hash(userPassword, 8);
};

export const comparePassword = async (
  userPassword: string,
  hashPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(userPassword, hashPassword);
};
