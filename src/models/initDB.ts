import db from "./db.ts";

export default () =>
  db.execute(`
  CREATE TABLE IF NOT EXISTS SensorEntry (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp INTEGER,
    gateway_id TEXT,
    humidity REAL,
    temperature REAL,
    pressure REAL,
    movement_counter INTEGER,
    mac TEXT,
    other_json TEXT
  );
  CREATE TABLE IF NOT EXISTS SensorInfo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mac TEXT,
    name TEXT
  );
  CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    hashed_password TEXT,
    is_gateway BOOLEAN
  );
`);
