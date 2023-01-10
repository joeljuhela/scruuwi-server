import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import testEnvOrExit from "../testEnvOrExit.ts";
import initDB from "../../src/models/initDB.ts";
import db from "../../src/models/db.ts";
import resetDatabase from "../../src/models/resetDatabase.ts";
import { checkPassword, findSingleUser } from "../../src/models/user.ts";

Deno.test("The user model tests", async (t) => {
  await t.step("Test that `DENO_ENV` is `TEST`", () => testEnvOrExit());
  await t.step(
    "`null` should be returned when `findSingleUser(username)` is called on an empty DB",
    () => {
      resetDatabase();
      assertEquals(null, findSingleUser("any_username"));
    },
  );
  await t.step("TODO: more tests after creating users to DB", () => {});
});
