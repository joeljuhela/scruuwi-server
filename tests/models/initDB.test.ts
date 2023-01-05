import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import testEnvOrExit from "../testEnvOrExit.ts";
import initDB from "../../src/models/initDB.ts";

Deno.test("Database initalization should succeed", async (t) => {
  await t.step("Test that `DENO_ENV` is `TEST`", () => testEnvOrExit());
  await t.step("There should be no errors when initializing the DB", () => {
    initDB();
  });
});
