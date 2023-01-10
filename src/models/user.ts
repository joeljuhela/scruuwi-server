import db from "./db.ts";
import { hashPassword, verifyPassword } from "../utils/passwordHashing.ts";

interface User {
  id: number;
  username: string;
  is_gateway: boolean;
  hashed_password?: string;
}

/**
 * Returns a single user based on username alone
 *
 * @param username
 * @returns a single user or null depending on result
 */
export const findSingleUser = (
  username: string,
  returnPasswordHash = false,
): User | null => {
  const results = db.query(
    `
        SELECT id, username, is_gateway, hashed_password
        FROM User
        WHERE username=(?)
    `,
    [
      username,
    ],
  );

  if (results.length != 1) {
    return null;
  } else {
    const row = results[0];
    const user: User = {
      id: row[0] as number,
      username: row[1] as string,
      is_gateway: row[2] as boolean,
    };
    if (returnPasswordHash) {
      user["hashed_password"] = row[3] as string;
    }
    return user;
  }
};

export const checkPassword = async (
  username: string,
  password: string,
): Promise<boolean> => {
  const user_with_hash: User | null = findSingleUser(username, true);

  if (user_with_hash) {
    return await verifyPassword(
      password,
      user_with_hash.hashed_password as string,
    );
  } else {
    return false;
  }
};
