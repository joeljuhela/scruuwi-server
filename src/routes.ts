import { Router } from "./deps/oak.ts";
import * as gatewayController from "./controllers/gatewayController.ts";

const router = new Router();

router
  .post("/insert-data", gatewayController.insertData);

export default router;
