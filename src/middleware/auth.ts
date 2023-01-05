import { Context } from "../deps/oak.ts";
import { djwt } from "../deps/djwt.ts";
import { key } from "../controllers/authController.ts";

export default async (ctx: Context, next: CallableFunction) => {
  try {
    console.log("auth called");
    const authHeader: string = ctx.request.headers.get(
      "authorization",
    ) as string;
    const JWTString: string = authHeader.substring(7);
    await djwt.verify(JWTString, key); // will raise error if non-valid
    await next();
  } catch {
    ctx.throw(401);
  }
};
