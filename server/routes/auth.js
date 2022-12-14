import express from "express";
import { signin, signup, logout, changePassword } from "../controllers/auth.js";
import { CreateStaffValidator } from "../validators/Manager.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/signup", CreateStaffValidator, signup);

router.post("/login", signin);

router.get("/logout", logout);

router.post("/change-password", verifyToken, changePassword);

export default router;
