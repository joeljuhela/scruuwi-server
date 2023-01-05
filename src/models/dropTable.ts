import db from "./db.ts";
import getTables from "./getTables.ts";

export default (table: string) => {
  const tables = getTables();
  if (tables.includes(table)) {
    db.query(`DROP TABLE ${table};`);
  } else {
    throw new Error(`No such table: "${table}"`);
  }
};
