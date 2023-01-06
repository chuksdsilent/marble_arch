import express from "express";
import {
  create,
  getAllRestaurant,
  getMenu,
  getMenuRequest,
  updateOrderRequest,
  updateMenu,
} from "../controllers/restaurant.js";
import { verifyKitchenToken, verifyRestaurantToken } from "../verifyToken.js";
import { addMenuRequestValidator } from "../validators/RestaurantValidator.js";

const router = express.Router();

router.post("/create", verifyRestaurantToken, create);
router.put("/order/:orderId", verifyKitchenToken, updateOrderRequest);
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
