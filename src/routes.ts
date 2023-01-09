import { Router } from "./deps/oak.ts";
import * as gatewayController from "./controllers/gatewayController.ts";

const router = new Router();

router
  .post("/insert-data", gatewayController.insertData);

// TODO: require auth for some sensors?
router
  .get("/get-sensor-macs", gatewayController.getSensorMacsController);

router
  .get("/get-latest-by-mac/:mac", gatewayController.getLatestByMac);

export default router;
