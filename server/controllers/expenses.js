import { createError } from "../error.js";
import Expenses from "../models/Expenses.js";
import validator from "express-validator";
const { validationResult } = validator;

export const getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expenses.find({})
      .select("-_id -updatedAt -__v")
      .sort({ createdAt: -1 });
    if (!expenses) return res.status(404).json("No Expenses Found");
    return res.status(200).json(expenses);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);

  const hasError = !error.isEmpty();

  if (hasError) {
    res.status(422).json({ error: error.array() });
  } else {
    const newExpense = new Expenses({ ...req.body, staffId: req.user.id });
    try {
      const savedExpense = await newExpense.save();

      return res.status(200).json(savedExpense);
    } catch (error) {
      next(error);
    }
  }
};
