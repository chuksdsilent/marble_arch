import express from "express";
import {
  create,
  getBarOrders,
  getAllStockSent,
  acceptStockSent,
  printReceipt,
  searchBarOrders,
} from "../controllers/bar.js";
import { createNewItem, getAllItems } from "../controllers/barItems.js";
import { verifyBarToken } from "../verifyToken.js";
import {
  CreateOrderValidator,
  CreateBarItemValidator,
} from "../validators/BarValidator.js";

const router = express.Router();

/**************** Bar Orders **************************/

router.get("/", verifyBarToken, getBarOrders);

router.post("/search-bar", verifyBarToken, searchBarOrders);

router.get("/get-all-stock-sent", verifyBarToken, getAllStockSent);

router.post("/create", verifyBarToken, CreateOrderValidator, create);

router.put("/accept/:stockId", verifyBarToken, acceptStockSent);

router.get("/print-receipt/:id", verifyBarToken, printReceipt);

/********************Bar Items *************************************/

router.get("/bar-items", verifyBarToken, getAllItems);

router.post(
  "/bar-items/create",
  verifyBarToken,
  CreateBarItemValidator,
  createNewItem
);

export default router;
