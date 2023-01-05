import db from "./db.ts";
import verifyTableName from "../utils/verifyTableName.ts";

export default (table: string) => {
  if (verifyTableName(table)) {
    db.query(`DROP TABLE ${table};`);
  } else {
    throw new Error(`No such table: "${table}"`);
  }
};
