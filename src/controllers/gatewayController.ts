import addSensorEntry from "../models/addSensorEntry.ts";
import getUnixTimestamp from "../utils/getUnixTimestamp.ts";

export const insertData = async (ctx) => {
  console.info("Insert sensor data to db");
  const data = await ctx.request.body().value;
  console.log(ctx.request);
  const other = {
    ruuvi_data_format: data.data_format,
    acceleration: {
      acceleration: data.acceleration,
      x: data.acceleration_x,
      y: data.acceleration_y,
      z: data.acceleration_z,
    },
    tx_power: data.tx_power,
    battery: data.battery,
    measurement_sequence_number: data.measurement_sequence_number,
  };
  data.other_json = JSON.stringify(other);
  data.timestamp = getUnixTimestamp();
  console.log(data);
  //             use gateway id from the username instead
  addSensorEntry("Arrakeen", body);
};
