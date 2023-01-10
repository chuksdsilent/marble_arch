import express from "express";
import {
  verifyManagerToken,
  verifyStoreKeeperToken,
  verifyToken,
} from "../verifyToken.js";
import {
  create,
  update,
  index,
  getStock,
  destroy,
  updateStock,
  getStockDispatched,
  updateStockDispatched,
} from "../controllers/Stocks.js";
import { createStockDispatched } from "../controllers/StockDispatch.js";
import {
  addStockValidator,
  updateStockValidator,
  stockDispatchValidator,
} from "../validators/StoreKeeper.js";
const router = express.Router();

/***************** Stocks ************************/

router.get("/", verifyStoreKeeperToken, index);

router.get("/:id", getStock);

router.get("/stock-dispatched/:id", getStockDispatched);

router.put("/stock-dispatched/:id", updateStockDispatched);

router.put("/:id", updateStock);

router.post("/create", verifyStoreKeeperToken, addStockValidator, create);

router.put("/update/:id", verifyToken, updateStockValidator, update);

router.delete("/delete/:id", verifyStoreKeeperToken, destroy);

export default router;
