import db from "./db.ts";

export default (gateway_id, data) => {
  db.query(`
    INSERT INTO SensorEntry (
      gateway_id,
      data_format,
      humidity,
      temperature,
      pressure,
      acceleration_x,
      acceleration_y,
      acceleration_z,
      tx_power,
      battery,
      movement_counter,
      measurement_sequence_number,
      mac
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      gateway_id,
      data.data_format,
      data.humidity,
      data.temperature,
      data.pressure,
      data.acceleration_x,
      data.acceleration_y,
      data.acceleration_z,
      data.tx_power,
      data.battery,
      data.movement_counter,
      data.measurement_sequence_number,
      data.mac,
    ]
  );
};
