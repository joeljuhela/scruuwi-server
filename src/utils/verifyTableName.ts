import getTables from "../models/getTables.ts";

export default (table: string): boolean => {
  const tables = getTables();
  return tables.includes(table);
};
