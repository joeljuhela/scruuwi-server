import { Application } from "./deps/oak.ts";
import router from "./routes.ts";
import initDB from "./models/initDB.ts";

const app = new Application();
app.use(router.routes());
initDB();

await app.listen({ port: 8000 });
