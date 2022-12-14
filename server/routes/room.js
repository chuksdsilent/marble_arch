import express from "express";
import { addRoom, getAllRooms, updateRoomPrice } from "../controllers/Room.js";
import { verifyReceptionistToken } from "../verifyToken.js";
import { roomValidator } from "../validators/Receptionist.js";

const router = express.Router();

router.get("/", verifyReceptionistToken, getAllRooms);
router.post("/create", verifyReceptionistToken, roomValidator, addRoom);
router.put("/update/:id", verifyReceptionistToken, updateRoomPrice);

export default router;
