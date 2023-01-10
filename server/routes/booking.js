import express from "express";
import { verifyReceptionistToken, verifyManagerToken } from "../verifyToken.js";
import {
  booking,
  transferGuest,
  updateGuest,
  checkOutGuest,
  displayAllBooking,
  bookedRooms,
  searchForGuest,
  freeRooms,
  bookingWithOldGuest,
  getFreeRooms,
  updateFreeRooms,
} from "../controllers/Booking.js";
import {
  bookingValidator,
  transferGuestValidator,
  updateGuestValidator,
  checkOutGuestValidator,
  searchForGuestValidator,
  bookingWithOldGuestValidator,
} from "../validators/Receptionist.js";

const router = express.Router();

router.get("/all-booking", verifyReceptionistToken, displayAllBooking);

router.get(
  "/booked-rooms",
  verifyManagerToken,
  verifyReceptionistToken,
  bookedRooms
);

router.get("/free-rooms", freeRooms);

router.get("/free-rooms/:id", getFreeRooms);

router.put("/free-rooms/:id", updateFreeRooms);

router.post("/check-in", verifyReceptionistToken, bookingValidator, booking);

router.post(
  "/old-guest",
  verifyReceptionistToken,
  bookingWithOldGuestValidator,
  bookingWithOldGuest
);

router.post(
  "/transfer-guest",
  verifyReceptionistToken,
  transferGuestValidator,
  transferGuest
);

router.post(
  "/search-for-guest",
  verifyReceptionistToken,
  searchForGuestValidator,
  searchForGuest
);

router.put(
  "/update-guest/:id",
  verifyReceptionistToken,
  updateGuestValidator,
  updateGuest
);

router.put(
  "/check-out-guest/:roomNumber",
  verifyReceptionistToken,
  checkOutGuestValidator,
  checkOutGuest
);

export default router;
