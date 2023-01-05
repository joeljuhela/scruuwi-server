import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.168.0/testing/asserts.ts";
import testEnvOrExit from "../testEnvOrExit.ts";
import initDB from "../../src/models/initDB.ts";
import db from "../../src/models/db.ts";
import resetDatabase from "../../src/models/resetDatabase.ts";
import addSensorEntry from "../../src/models/addSensorEntry.ts";
import getSensorMacs from "../../src/models/getSensorMacs.ts";
import getUnixTimestamp from "../../src/utils/getUnixTimestamp.ts";

Deno.test("Entries should be added to database", async (t) => {
  await t.step("Test that `DENO_ENV` is `TEST`", () => testEnvOrExit());
  await t.step("The entries should be added to db", () => {
    const gateway = "test gateway 1";
    const macs = ["035efb7a0919", "0fe39e8b34ae", "d9503059e024"];
    const data = {
      date: getUnixTimestamp(),
      temperature: -2.30,
      mac: macs[0],
    };

    resetDatabase();
    assertEquals(getSensorMacs().length, 0);

    addSensorEntry(gateway, data);
    assertEquals(getSensorMacs().length, 1);
    assertArrayIncludes(getSensorMacs(), [macs[0]]);

    data.temperature = 1.01;
    data.mac = macs[1];
    addSensorEntry(gateway, data);
    assertEquals(getSensorMacs().length, 2);
    assertArrayIncludes(getSensorMacs(), [macs[0], macs[1]]);

    // adding a new entry from the same sensor doesn't change output
    addSensorEntry(gateway, data);
    assertEquals(getSensorMacs().length, 2);
    assertArrayIncludes(getSensorMacs(), [macs[0], macs[1]]);

    data.temperature = -1.01;
    data.mac = macs[2];
    addSensorEntry(gateway, data);
    assertEquals(getSensorMacs().length, 3);
    assertArrayIncludes(getSensorMacs(), macs);
  });
});
