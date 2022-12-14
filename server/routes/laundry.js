import express from "express";
import {
  index,
  create,
  acceptStockSent,
  laundryUsedStocks,
} from "../controllers/laundry.js";

import { verifyLaundryToken } from "../verifyToken.js";
import { CreateMaintenanceItemValidator } from "../validators/MaintenanceValidator.js";

const router = express.Router();

router.get("/used-stocks", verifyLaundryToken, laundryUsedStocks);

router.get("/", verifyLaundryToken, index);

router.put("/:trxId", verifyLaundryToken, acceptStockSent);
router.post(
  "/create",
  verifyLaundryToken,
  CreateMaintenanceItemValidator,
  create
);

export default router;
