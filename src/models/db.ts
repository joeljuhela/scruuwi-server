import { DB } from "https://deno.land/x/sqlite@v3.7.0/mod.ts";
import config from "../config.ts";

const db = new DB(`./db/${config.env}.sqlite3`);

export default db;
