import { bcrypt } from "../deps/bcrypt.ts";

export const hashPassword = async (pass: string): Promise<string> => {
  return await bcrypt.hash(pass);
};

export const verifyPassword = async (
  pass: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(pass, hash);
};
