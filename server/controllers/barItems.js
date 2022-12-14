import mongoose from "mongoose";
import { response } from "express";
import Bar from "../models/Bar.js";
import validator from "express-validator";
const { validationResult } = validator;
import BarItems from "../models/BarItems.js";

export const getAllItems = async (req, res, next) => {
  try {
    const items = await BarItems.find({})
      .select("-__v -updatedAt")
      .sort({ createdAt: -1 });
    if (!items) return res.status(208).json({ msg: "No Item Found" });

    return res.status(208).json(items);
  } catch (error) {
    next(error);
  }
};

export const createNewItem = async (req, res, next) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);
  const hasError = !error.isEmpty();
  let user_items = [];
  if (hasError) {
    res.status(422).json({ error: error.array() });
  } else {
    const options = { ordered: true };
    let user_items = [];
    for (let [index, item] of req.body.items.entries()) {
      user_items.push({
        ...item,
        staffId: req.user.id,
      });
    }
    try {
      const items = await BarItems.insertMany(user_items, options);
      if (!items)
        return res.status(500).json({ msg: "Error. Please try again." });

      return res.status(200).json({ msg: "stock uploaded successfully.." });
    } catch (error) {
      next(error);
    }
  }
};
