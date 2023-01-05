import { Router, Response } from "https://deno.land/x/oak/mod.ts";
import * as gatewayController from "./controllers/gatewayController.ts";

const router = new Router();

router
    .post("/insert-data", gatewayController.insertData)

export default router;