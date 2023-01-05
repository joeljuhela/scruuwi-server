import db from "../models/db.ts";
import { type Row } from "https://deno.land/x/sqlite@v3.7.0/mod.ts";

const sqlToAttributes = (sql: string): string[] => {
  const inside = sql.split("(")[1].split(")")[0];
  const attributeRows = inside.split(",");
  const attributes = attributeRows
    .map((a) => a.trim().split(" ")[0]);
  return attributes;
};

/* only works when using "SELECT *" */
export default (row: Row, table: string): any => {
  const rows: Row[] = db.query(
    `
    SELECT sql
    FROM sqlite_schema
    WHERE
      type = 'table'
        AND
      tbl_name = ?
  `,
    [table],
  );
  if (rows.length === 0) {
    throw new Error("No table found");
  }
  const tableSQL: string = rows[0][0] as string;
  const attributes = sqlToAttributes(tableSQL);
  if (attributes.length !== row.length) {
    throw new Error(
      "Attribute's length is not the same as Row's length!",
    );
  }
  const result: any = {};
  for (let i: number = 0; i < row.length; i++) {
    result[attributes[i]] = row[i];
  }
  return result;
};
