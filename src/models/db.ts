import { DB } from "https://deno.land/x/sqlite@v3.7.0/mod.ts";
import config from "../config.ts";

const env = config.env;

const db = env === "test" ? new DB() : new DB(`./db/${env}.sqlite3`);

export default db;
