import express from "express";
import { getUser } from "../controllers/auth.js";

import {
  getAllBookedRooms,
  getAllBookings,
  getAllBookingsToday,
  getAllStaffs,
  suspendStaffs,
  unSuspendStaffs,
  changeStaffRole,
  searchBookings,
  getAllGuests,
  getGuest,
  getDashboardData,
} from "../controllers/manager.js";
import {
  getStockForDispatch,
  index,
  searchStocks,
} from "../controllers/Stocks.js";
import { verifyManagerToken, verifyToken } from "../verifyToken.js";
import {
  stockDispatched,
  searchStockDispatched,
  getStockDispatched,
} from "../controllers/StockDispatch.js";
import { getExpenses } from "../controllers/expenses.js";
import { usedStocks } from "../controllers/maintenance.js";
import {
  getAllRestaurant,
  searchRestaurant,
} from "../controllers/restaurant.js";
import { getBarOrders, searchBarOrders } from "../controllers/bar.js";
import { laundryUsedStocks } from "../controllers/laundry.js";
const router = express.Router();
// router.get("/", verifyManagerToken, getAllRestaurant);
// router.get("/:menuId", verifyManagerToken, getMenuRequest);
router.get("/laundry", verifyToken, laundryUsedStocks);
router.post("/search-restaurant", verifyToken, searchRestaurant);
router.get("/restaurant", verifyToken, getAllRestaurant);
router.post("/search-bar", verifyToken, searchBarOrders);
router.get("/bar", verifyToken, getBarOrders);
router.get("/maintenance", verifyToken, usedStocks);
router.get("/dashboard", verifyToken, getDashboardData);
router.get("/get-user", verifyToken, getUser);
router.get("/bookings", verifyToken, getAllBookings);
router.get("/bookings/today", verifyToken, getAllBookingsToday);
router.get("/booked-rooms", verifyToken, getAllBookedRooms);
router.get("/stocks", verifyToken, index);
router.get("/stocks-for-dispatch", verifyToken, getStockForDispatch);
router.get("/stock-dispatched/:id", verifyToken, getStockDispatched);
router.post("/search-stocks", verifyToken, searchStocks);
router.get("/staffs", verifyToken, getAllStaffs);
router.get("/guests", verifyToken, getAllGuests);
router.get("/guests/:id", verifyToken, getGuest);
router.put("/staffs/change-role/:id", verifyToken, changeStaffRole);
router.put("/staffs/suspend/:id", verifyToken, suspendStaffs);
router.put("/staffs/unsuspend/:id", verifyToken, unSuspendStaffs);
router.get("/stock-dispatched", verifyToken, stockDispatched);
router.get("/expenses", verifyToken, getExpenses);

router.post(
  "/search-dispatched-stocks",
  verifyManagerToken,
  searchStockDispatched
);
router.post("/search-bookings", verifyManagerToken, searchBookings);

export default router;
