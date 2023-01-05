import { Application } from "./deps/oak.ts";
import router from "./routes.ts";
import initDB from "./models/initDB.ts";

const app = new Application();
app.use(router.routes());
initDB();

const port = 8000;
console.log("Starting server on port", port);
await app.listen({ port });
