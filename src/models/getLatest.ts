import db from "./db.ts";
import unifyMac from "../utils/unifyMac.ts";
import rowToObject from "../utils/rowToObject.ts";

export default (mac: string): any | null => {
  const result = db.query(
    `
    SELECT *
    FROM SensorEntry
    WHERE mac = ?
    ORDER BY timestamp DESC
    LIMIT 1
  ;`,
    [unifyMac(mac)],
  );
  if (result.length === 0) {
    return null;
  } else {
    return rowToObject(result[0], "SensorEntry");
  }
};
