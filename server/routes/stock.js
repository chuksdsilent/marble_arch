import express from "express";
import { verifyStoreKeeperToken } from "../verifyToken.js";
import {
  create,
  update,
  index,
  getStock,
  destroy,
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

router.get("/:id", verifyStoreKeeperToken, getStock);

router.post("/create", verifyStoreKeeperToken, addStockValidator, create);

router.put("/update/:id", verifyStoreKeeperToken, updateStockValidator, update);

router.delete("/delete/:id", verifyStoreKeeperToken, destroy);

export default router;
