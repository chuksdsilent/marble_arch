import mongoose from "mongoose";
import { response } from "express";
import StockDispatches from "../models/StockDispatch.js";
import Stocks from "../models/Stocks.js";
import validator from "express-validator";
const { validationResult } = validator;
import { generateRamdom } from "../utils/Utils.js";
import { todayPipeline } from "../GlobalVarialbles.js";

export const getStockDispatched = async (req, res, next) => {
  try {
    const stockDispatched = await StockDispatches.find({ _id: req.params.id })
      .populate("stockId")
      .populate("staffId")
      .select(" -__v -updatedAt")
      .sort({ createdAt: -1 });

    if (!stockDispatched)
      return res.status(208).json({ msg: "No Stock Dispatched Found" });

    return res.status(208).json(stockDispatched);
  } catch (error) {
    next(error);
  }
};

export const stockDispatched = async (req, res, next) => {
  try {
    let stockDispatched;
    if (req.query.query && req.query.query === "today") {
      stockDispatched = await StockDispatches.find(todayPipeline)
        .populate("stockId")
        .populate("staffId")
        .select(" -__v -updatedAt")
        .sort({ createdAt: -1 });
    } else {
      stockDispatched = await StockDispatches.find({})
        .populate("stockId")
        .populate("staffId")
        .select(" -__v -updatedAt")
        .sort({ createdAt: -1 });
    }

    return res.status(200).json(stockDispatched);
  } catch (error) {
    next(error);
  }
};

export const stockDispatchedForDepartments = async (req, res, next) => {
  try {
    const stockDispatched = await StockDispatches.find({
      department: req.query.department,
      quantity: { $gt: 0 },
    })
      .populate("stockId")
      .populate("staffId")
      .select(" -__v -password -updatedAt")
      .sort({ createdAt: -1 });

    return res.status(200).json(stockDispatched);
  } catch (error) {
    next(error);
  }
};

export const searchStockDispatched = async (req, res, next) => {
  try {
    const stockDispatched = await StockDispatches.find({
      createdAt: {
        $gte: new Date(req.body.startDate),
        $lt: new Date(req.body.endDate),
      },
    })
      .populate("stockId")
      .populate("staffId")
      .select(" -__v -updatedAt")
      .sort({ createdAt: -1 });

    if (!stockDispatched)
      return res.status(208).json({ msg: "No Stock Dispatched Found" });

    return res.status(208).json(stockDispatched);
  } catch (error) {
    next(error);
  }
};

export const createStockDispatched = async (req, res, next) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);
  const trx_id = generateRamdom(30);
  let quantity = 0;
  let dispatchedTotal = 0;
  const hasError = !error.isEmpty();
  const options = { ordered: true };

  if (hasError) {
    res.status(422).json({ error: error.array() });
  } else {
    var userStockDispatch = [];
    let validQTY = true;

    for await (const stock of req.body.stocks) {
      const stockFromDb = await Stocks.findOne({ _id: stock.stockId });
      if (!stockFromDb)
        return res.status(404).json({ msg: "Stock Not Found." });

      let total = stockFromDb.price * stock.quantity;
      dispatchedTotal = stock.quantity * stockFromDb.price;
      let price = stockFromDb.price;
      if (stock.quantity > stockFromDb.quantity) {
        validQTY = false;
        return res.status(200).json({
          msg: `Quantity of ${stockFromDb.name} is greater than what we have in database`,
        });
      }

      userStockDispatch.push({
        ...stock,
        trx_id,
        price,
        total: dispatchedTotal,
        staffId: req.user.id,
      });

      quantity = stockFromDb.quantity - stock.quantity;
      total = quantity * stockFromDb.price;

      const updated_stock = await Stocks.findByIdAndUpdate(
        stock.stockId,
        { quantity, total },
        { $new: true }
      );
    }

    try {
      if (userStockDispatch.length > 0) {
        const stockDispatched = await StockDispatches.insertMany(
          userStockDispatch,
          options
        );
        if (stockDispatched.length == 0)
          return res.status(500).json({ msg: "Error. Please try again." });
        if (validQTY) return res.status(200).json(userStockDispatch);
      }
    } catch (error) {
      next(error);
    }
  }
};
