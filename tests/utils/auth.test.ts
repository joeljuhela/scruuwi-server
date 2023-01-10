import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { parseBasicAuthHeader } from "../../src/utils/auth.ts";

Deno.test("Auth header parsing should work", async (t) => {
  await t.step("Should handle an empty header", () => {
    const [user, pass] = parseBasicAuthHeader("");
    assertEquals(user, "");
    assertEquals(pass, "");
  });
  await t.step("Should parse a proper header correctly", () => {
    const creds = {
      user: "test username",
      pass: "test:password 1",
    };
    const header = btoa(`${creds.user}:${creds.pass}`);
    const [user, pass] = parseBasicAuthHeader(`Basic ${header}`);
    assertEquals(user, creds.user);
    assertEquals(pass, creds.pass);
  });
  await t.step("Should handle a malformed header (missing ':')", () => {
    const creds = {
      user: "test username",
      pass: "test password 1",
    };
    const header = btoa(`${creds.user}${creds.pass}`);
    const [user, pass] = parseBasicAuthHeader(`Basic ${header}`);
    // did not crash
    assertEquals(pass, "");
  });
  await t.step("Should handle a malformed header (UPPERCASE'd base64)", () => {
    const creds = {
      user: "test username",
      pass: "test password 1",
    };
    const header = btoa(`${creds.user}:${creds.pass}`).toUpperCase();
    const [user, pass] = parseBasicAuthHeader(`Basic ${header}`);
    // did not crash
    assertEquals(pass, "");
  });
});
