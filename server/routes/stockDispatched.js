import express from "express";
import { verifyStoreKeeperToken, verifyToken } from "../verifyToken.js";
import {
  createStockDispatched,
  stockDispatched,
  stockDispatchedForDepartments,
} from "../controllers/StockDispatch.js";

import {
  addStockValidator,
  updateStockValidator,
  stockDispatchValidator,
} from "../validators/StoreKeeper.js";

const router = express.Router();

/***************** Stocks Dispatched ************************/

router.get("/", verifyToken, stockDispatched);
router.get(
  "/stock-for-departments",
  verifyToken,
  stockDispatchedForDepartments
);

router.post(
  "/create",
  verifyStoreKeeperToken,
  stockDispatchValidator,
  createStockDispatched
);

export default router;
