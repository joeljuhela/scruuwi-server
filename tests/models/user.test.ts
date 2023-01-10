import {
  assertEquals,
  assertRejects,
} from "https://deno.land/std@0.168.0/testing/asserts.ts";
import testEnvOrExit from "../testEnvOrExit.ts";
import initDB from "../../src/models/initDB.ts";
import db from "../../src/models/db.ts";
import resetDatabase from "../../src/models/resetDatabase.ts";
import {
  checkPassword,
  createUser,
  findSingleUser,
  User,
} from "../../src/models/user.ts";

Deno.test("The user model tests", async (t) => {
  await t.step("Test that `DENO_ENV` is `TEST`", () => testEnvOrExit());
  await t.step(
    "`null` should be returned when `findSingleUser(username)` is called on an empty DB",
    () => {
      resetDatabase();
      assertEquals(null, findSingleUser("any_username"));
    },
  );
  const userData = {
    username: "test_user1",
    password: "password123",
    is_gateway: true,
  };
  await t.step("Adding a user should work", async () => {
    resetDatabase();
    assertEquals(
      (await createUser(userData) as User).username,
      userData.username,
    );
  });
  await t.step("Adding a user twice should fail", async () => {
    resetDatabase();
    await createUser(userData);
    await assertRejects(() => createUser(userData));
  });
});
