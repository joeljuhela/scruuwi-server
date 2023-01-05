import db from "./db.ts";

export default (): string[] => {
  return db.query(`
    SELECT name
    FROM sqlite_schema
    WHERE
      type = 'table'
        AND
      name NOT LIKE 'sqlite_%'
    ;
  `).map((name) => name[0] as string);
};
