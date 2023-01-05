import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.168.0/testing/asserts.ts";
import testEnvOrExit from "../testEnvOrExit.ts";
import initDB from "../../src/models/initDB.ts";
import db from "../../src/models/db.ts";
import resetDatabase from "../../src/models/resetDatabase.ts";
import addSensorEntry from "../../src/models/addSensorEntry.ts";
import getLatest from "../../src/models/getLatest.ts";
import getUnixTimestamp from "../../src/utils/getUnixTimestamp.ts";

const gateway = "Test gateway";
const macs = ["035efb7a0919", "0fe39e8b34ae", "d9503059e024"];
Deno.test("getLatest(mac) method should return the correct data", async (t) => {
  await t.step("Test that `DENO_ENV` is `TEST`", () => testEnvOrExit());
  await t.step("Should return null if there's no data", () => {
    resetDatabase();
    assertEquals(getLatest(macs[0]), null);
  });
  await t.step("Should return the latest data of the sensor", async (t) => {
    const data = {
      timestamp: getUnixTimestamp() - 5,
      temperature: -2.30,
      mac: macs[0],
    };
    const firstTemp = data.temperature;
    addSensorEntry(gateway, data);
    assertEquals(getLatest(macs[0]).temperature, firstTemp);

    data.temperature = 2.2;
    data.timestamp = getUnixTimestamp() - 500; // older than previous
    addSensorEntry(gateway, data);
    assertEquals(getLatest(macs[0]).temperature, firstTemp);

    data.temperature = 123.4;
    data.timestamp = getUnixTimestamp() + 10;
    addSensorEntry(gateway, data);
    assertEquals(getLatest(macs[0]).temperature, data.temperature);
  });
});
