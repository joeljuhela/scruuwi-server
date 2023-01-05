import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import testEnvOrExit from "../testEnvOrExit.ts";
import initDB from "../../src/models/initDB.ts";
import db from "../../src/models/db.ts";
import resetDatabase from "../../src/models/resetDatabase.ts";
import addSensorEntry from "../../src/models/addSensorEntry.ts";
import getUnixTimestamp from "../../src/utils/getUnixTimestamp.ts";

Deno.test("Entries should be added to database", async (t) => {
  await t.step("Test that `DENO_ENV` is `TEST`", () => testEnvOrExit());
  await t.step("There should be no errors when initializing the DB", () => {
    resetDatabase();
  });
  await t.step("The table should be empty initially", () => {
    resetDatabase();
    const q1 = db.query("SELECT * FROM SensorEntry;");
    assertEquals(q1.length, 0);
  });
  await t.step("The entries should be added to db", () => {
    const gateway = "test gateway 1";
    const data = {
      date: getUnixTimestamp(),
      temperature: -2.30,
      pressure: 1000.11,
      other: {
        ruuvi_data_format: 5,
        tx_power: 4,
        battery: 2883,
        acceleration: {
          acceleration: 984.1056853814025,
          acceleration_x: 12,
          acceleration_y: 8,
          acceleration_z: 984,
        },
        measurement_sequence_number: 850,
      },
      movement_counter: 9,
      mac: "f54fc211adc8",
    };
    addSensorEntry(gateway, data);
    const q2 = db.query("SELECT * FROM SensorEntry;");
    assertEquals(q2.length, 1);
    // another
    addSensorEntry(gateway, data);
    const q3 = db.query("SELECT * FROM SensorEntry;");
    assertEquals(q3.length, 2);
  });
});
