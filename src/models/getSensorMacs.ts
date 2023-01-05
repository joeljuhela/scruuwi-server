import db from "./db.ts";

export default (): string[] => {
  return db.query(`
    SELECT DISTINCT mac
    FROM SensorEntry;
  `).map((row) => row[0] as string);
};
