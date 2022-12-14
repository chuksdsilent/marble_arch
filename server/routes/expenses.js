import express from "express";
import { create, getExpenses } from "../controllers/expenses.js";
import { verifyToken } from "../verifyToken.js";
import { CreateExpensesValidator } from "../validators/BaseValidator.js";

const router = express.Router();

router.get("/", verifyToken, getExpenses);

router.post("/create", verifyToken, CreateExpensesValidator, create);

export default router;
