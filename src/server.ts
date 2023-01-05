import { Application } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import router from "./routes.ts";
import initDB from "./models/initDB.ts";

const app = new Application();
app.use(router.routes());
initDB();

await app.listen({ port: 8000 });
