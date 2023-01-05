import { Router } from "./deps/oak.ts";
import * as gatewayController from "./controllers/gatewayController.ts";

const router = new Router();

router
  .post("/insert-data", gatewayController.insertData);

// TODO: require auth for some sensors?
router
  .get("/get-sensor-macs", gatewayController.getSensorMacsController);

export default router;
