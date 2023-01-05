import db from "./db.ts";

export default (gatewayID: string, data: any) => {
  db.query(
    `
    INSERT INTO SensorEntry (
      timestamp,
      gateway_id,
      humidity,
      temperature,
      pressure,
      movement_counter,
      mac,
      other_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.timestamp,
      gatewayID,
      data.humidity,
      data.temperature,
      data.pressure,
      data.movement_counter,
      data.mac,
      data.other_json,
    ],
  );
};
