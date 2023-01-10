import { Router } from "./deps/oak.ts";
import * as gatewayController from "./controllers/gatewayController.ts";
import * as authController from "./controllers/authController.ts";
import authMiddleware from "./middleware/auth.ts";

const router = new Router();
router
  .post("/auth/login", authController.login)
  .post("/insert-data", authMiddleware, gatewayController.insertData)
  .get(
    "/get-sensor-macs",
    authMiddleware,
    gatewayController.getSensorMacsController,
  );

router
  .get("/get-latest-by-mac/:mac", gatewayController.getLatestByMac);

export default router;
