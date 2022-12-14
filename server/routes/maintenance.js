import express from "express";
import {
  index,
  create,
  acceptStockSent,
  usedStocks,
} from "../controllers/maintenance.js";
import { getAllFaults, createFault } from "../controllers/faults.js";
import { verifyMaintenanceToken } from "../verifyToken.js";
import {
  CreateMaintenanceItemValidator,
  CreateFaultValidator,
} from "../validators/MaintenanceValidator.js";

const router = express.Router();

router.get("/used-stocks", verifyMaintenanceToken, usedStocks);

router.get("/", verifyMaintenanceToken, index);

router.put("/:trxId", verifyMaintenanceToken, acceptStockSent);
router.post(
  "/create",
  verifyMaintenanceToken,
  CreateMaintenanceItemValidator,
  create
);

/************************Faults*************************/

router.get("/faults", verifyMaintenanceToken, getAllFaults);

router.post(
  "/faults/create",
  verifyMaintenanceToken,
  CreateFaultValidator,
  createFault
);

export default router;
