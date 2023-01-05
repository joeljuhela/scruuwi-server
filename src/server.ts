import { Application } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import initDB from "./models/initDB.ts";

const app = new Application();
initDB()

await app.listen({port: 8000})