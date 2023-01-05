import addSensorEntry from "../models/addSensorEntry.ts";

export const insertData = async (ctx) => {
  console.info("Insert sensor data to db");
  const body = await ctx.request.body().value;
  console.log(ctx.request);
  console.log(body);
  addSensorEntry("Arrakeen", body);
};
