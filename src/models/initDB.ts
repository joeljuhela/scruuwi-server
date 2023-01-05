import db from "./db.ts";

export default () =>
  db.execute(`
  CREATE TABLE IF NOT EXISTS SensorEntry (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    gateway_id TEXT,
    data_format INTEGER,
    humidity REAL,
    temperature REAL,
    pressure REAL,
    acceleration_x INTEGER,
    acceleration_y INTEGER,
    acceleration_z INTEGER,
    tx_power INTEGER,
    battery INTEGER,
    movement_counter INTEGER,
    measurement_sequence_number INTEGER,
    mac TEXT
  );
  CREATE TABLE IF NOT EXISTS SensorName (
    mac TEXT,
    name TEXT
  );
  CREATE TABLE IF NOT EXISTS Gateways (
    username TEXT,
    hashed_password TEXT
  );
`);
