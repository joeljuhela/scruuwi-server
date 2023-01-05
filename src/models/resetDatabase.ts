import initDB from "./initDB.ts";
import getTables from "./getTables.ts";
import dropTable from "./dropTable.ts";

export default () => {
  getTables().forEach((table) => dropTable(table));
  initDB();
};
