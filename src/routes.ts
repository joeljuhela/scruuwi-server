import { Router } from "./deps/oak.ts";
import * as gatewayController from "./controllers/gatewayController.ts";
import * as authController from "./controllers/authController.ts";

const router = new Router();

router
  .post("/insert-data", gatewayController.insertData)
  .post("/auth/login", authController.login)
  .get("/get-sensor-macs", gatewayController.getSensorMacsController);

export default router;
