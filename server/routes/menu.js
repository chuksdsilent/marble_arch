import express from "express";
import { create, index, update } from "../controllers/Menu.js";
import { verifyToken } from "../verifyToken.js";
import { menuValidator } from "../validators/BaseValidator.js";

const router = express.Router();

router.post("/create", verifyToken, menuValidator, create);
router.get("/", verifyToken, index);
router.put("/:id", verifyToken, update);

export default router;
