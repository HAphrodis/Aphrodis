// src/utils/passwordUtils.ts
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;
const PASSWORD_EXPIRATION_DAYS =
  Number(process.env.PASSWORD_EXPIRATION_DAYS) || 90;

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const isPasswordExpired = (passwordLastChanged: Date): boolean => {
  const now = new Date();
  const expirationDate = new Date(passwordLastChanged);
  expirationDate.setDate(expirationDate.getDate() + PASSWORD_EXPIRATION_DAYS);
  return now > expirationDate;
};
