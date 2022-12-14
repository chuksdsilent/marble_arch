import { createError } from "../error.js";
import Faults from "../models/Faults.js";
import validator from "express-validator";
const { validationResult } = validator;

export const getAllFaults = async (req, res, next) => {
  try {
    const faults = await Faults.find({})
      .select("-updatedAt -__v")
      .sort({ createdAt: -1 });
    if (!faults) return res.status(404).json("No Faults Found");
    return res.status(200).json(faults);
  } catch (error) {
    next(error);
  }
};

export const createFault = async (req, res, next) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);

  const hasError = !error.isEmpty();
  console.log("clicked");

  if (hasError) {
    res.status(422).json({ error: error.array() });
  } else {
    const newFault = new Faults({ ...req.body, staffId: req.user.id });
    try {
      const savedFault = await newFault.save();
      return res.status(200).json(savedFault);
    } catch (error) {
      next(error);
    }
  }
};
