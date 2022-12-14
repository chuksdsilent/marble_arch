import express from "express";
import { getStockRequest, newStockRequest } from "../controllers/Kitchen.js";
import { verifyKitchenToken, verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get("/stock-request", verifyToken, getStockRequest);
router.post("/new-stock-request", verifyToken, newStockRequest);

export default router;
