import mongoose from "mongoose";
import { createError } from "../error.js";
import NewStockRequest from "../models/NewStockRequest.js";

export const newStockRequest = async (req, res, next) => {
  console.log(req.body);
  try {
    const newStockRequest = await NewStockRequest.insertMany(req.body);
    if (!newStockRequest)
      return res.status(404).json({ message: "Error Occurred." });

    return res.status(200).json(newStockRequest);
  } catch (error) {
    createError(error);
  }
};

export const getStockRequest = async (req, res, next) => {
  console.log(req.body.stocks);
  try {
    const stockRequest = await NewStockRequest.find({
      department: req.query.department,
    }).sort({ createdAt: -1 });
    if (!newStockRequest)
      return res.status(404).json({ message: "Error Occured." });

    return res.status(200).json(stockRequest);
  } catch (error) {
    createError(error);
  }
};
