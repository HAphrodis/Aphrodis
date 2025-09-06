import bcrypt from "bcryptjs";

/**
 * Compares a plain text password with a hashed password.
 * @param plainPassword The plain text password.
 * @param hashedPassword The hashed password.
 * @returns A boolean indicating if the passwords match.
 */
export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
