import addSensorEntry from "../models/addSensorEntry.ts";
import getUnixTimestamp from "../utils/getUnixTimestamp.ts";
import getSensorMacs from "../models/getSensorMacs.ts";
import getLatest from "../models/getLatest.ts";
import unifyMac from "../utils/unifyMac.ts";

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
  data.mac = unifyMac(data.mac);
  console.log(data);
  //             use gateway id from the username instead
  addSensorEntry("Arrakeen", data);
};

export const getSensorMacsController = async (ctx) => {
  console.info("Getting sensor mac addresses from db");
  ctx.response.body = getSensorMacs();
};

export const getLatestByMac = async (ctx) => {
  const mac = ctx.params.mac;
  const value = getLatest(mac);
  if (!value) {
    console.info(`Couldn't find latest value from sensor ${mac}`);
    ctx.response.status = 404;
    ctx.response.body = {
      error: `Couldn't find latest value from sensor ${mac}`,
    };
  } else {
    console.info(`Found value for sensor ${mac}: ${value}`);
    ctx.response.body = value;
  }
};
