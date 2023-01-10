import { djwt } from "../deps/djwt.ts";
import { Context } from "../deps/oak.ts";
import { checkPassword, findSingleUser } from "../models/user.ts";
import { parseBasicAuthHeader } from "../utils/auth.ts";

export const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);

/**
 * Checks the user's / gateway's credentials and creates a JWT token
 *
 * Authentication expects HTTP Basic auth
 * @param ctx
 */
export const login = async (ctx: Context) => {
  const authHeader: string | null = ctx.request.headers.get("authorization");
  if (authHeader) {
    const [username, password] = parseBasicAuthHeader(authHeader);
    const user = findSingleUser(username);
    const passwordMatch: boolean = await checkPassword(username, password);

    if (passwordMatch && user) {
      console.log("Here is not supposed to be");
      const jwt = await djwt.create(
        { alg: "HS512", typ: "JWT" },
        { userId: user.id },
        key,
      );
      ctx.response.status = 200;
      ctx.response.body = {
        token: jwt,
      };
    } else {
      ctx.response.status = 401;
    }
  } else {
    ctx.response.status = 401;
  }
};
