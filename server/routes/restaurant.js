import express from "express";
import {
  create,
  getAllRestaurant,
  getMenu,
  getMenuRequest,
  updateOrderRequest,
  updateMenu,
  getRestaurantOrder,
  updateRestaurantOrderRequest,
} from "../controllers/restaurant.js";
import {
  verifyKitchenToken,
  verifyManagerToken,
  verifyRestaurantToken,
  verifyToken,
} from "../verifyToken.js";
import { addMenuRequestValidator } from "../validators/RestaurantValidator.js";

const router = express.Router();

router.post("/create", verifyRestaurantToken, create);
router.get("/order/:id", verifyManagerToken, getRestaurantOrder);
router.put("/order/:orderId", verifyKitchenToken, updateOrderRequest);
router.put("/request/order/:id", verifyToken, updateRestaurantOrderRequest);
router.get(
  "/",
  verifyRestaurantToken,
  addMenuRequestValidator,
  getAllRestaurant
);
router.get(
  "/:menuId",
  verifyRestaurantToken,
  addMenuRequestValidator,
  getMenuRequest
);
router.get(
  "/menu/:menuId",
  verifyRestaurantToken,
  addMenuRequestValidator,
  getMenu
);
router.put(
  "/menu/:menuId",
  verifyRestaurantToken,
  addMenuRequestValidator,
  updateMenu
);
// router.put("/update/:id", verifyReceptionistToken,  updateRoomPrice)

export default router;
