import bcrypt from "bcryptjs";

export const encryptPassword = async (
  userPassword: string
): Promise<string> => {
  return await bcrypt.hash(userPassword, 8);
};
