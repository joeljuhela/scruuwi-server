import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.168.0/testing/asserts.ts";
import {
  hashPassword,
  verifyPassword,
} from "../../src/utils/passwordHashing.ts";

const password = "FXpBJkQqyUC3JqdC4Qfw";
Deno.test("Password hashing", async (t) => {
  await t.step("Hashing and verifying should work", async () => {
    const hash = await hashPassword(password);
    assertNotEquals(password, hash);
    assertEquals(await verifyPassword(password, hash), true);
  });
  await t.step(
    "Verifying should return `false` for a wrong password",
    async () => {
      const hash = await hashPassword(password);
      assertEquals(await verifyPassword(password + "a", hash), false);
    },
  );
});
