import { createError } from "../error.js";
import Stocks from "../models/Stocks.js";
import StockDispatches from "../models/StockDispatch.js";
import validator from "express-validator";
const { validationResult } = validator;
import { generateRamdom } from "../utils/Utils.js";
import { todayPipeline } from "../GlobalVarialbles.js";

export const index = async (req, res, next) => {
  let stocks;
  try {
    if (req.query.query === "today") {
      stocks = await Stocks.find(todayPipeline)
        .populate("staffId", "-password")
        .select("-__v -updatedAt")
        .sort({ createdAt: -1 });
    } else {
      stocks = await Stocks.find({})
        .populate("staffId", "-password")
        .select("-__v -updatedAt")
        .sort({ createdAt: -1 });
    }
    if (!stocks) return res.status(208).json({ msg: "No Stock Found" });

    return res.status(208).json(stocks);
  } catch (error) {
    next(error);
  }
};
export const getStockForDispatch = async (req, res, next) => {
  let stockDispatched;
  try {
    stockDispatched = await Stocks.find({
      quantity: { $gt: 0 },
    })
      .select("-__v -updatedAt")
      .sort({ createdAt: -1 });

    return res.status(208).json(stockDispatched);
  } catch (error) {
    next(error);
  }
};

export const searchStocks = async (req, res, next) => {
  try {
    const stocks = await Stocks.find({
      createdAt: {
        $gte: new Date(req.body.startDate),
        $lt: new Date(req.body.endDate),
      },
    })
      .populate("staffId")
      .select("-__v -updatedAt")
      .sort({ createdAt: -1 });
    if (!stocks) return res.status(208).json({ msg: "No Stock Found" });

    return res.status(208).json(stocks);
  } catch (error) {
    next(error);
  }
};

export const updateStockDispatched = async (req, res, next) => {
  try {
    const stocks = await StockDispatches.findById(req.params.id);
    if (!stocks) return res.status(404).json({ msg: "Stock Not Found" });

    const total = req.body.price * req.body.quantity;
    console.log("total is ", total);
    const stockUpdated = await StockDispatches.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          quantity: req.body.quantity,
          price: req.body.price,
          total: total,
        },
      },
      {
        upset: true,
      }
    );
    return res.status(208).json(stockUpdated);
  } catch (error) {
    next(error);
  }
};
export const getStockDispatched = async (req, res, next) => {
  try {
    const stocks = await StockDispatches.findById(req.params.id).populate(
      "stockId"
    );
    if (!stocks) return res.status(404).json({ msg: "Stock Not Found" });

    return res.status(208).json(stocks);
  } catch (error) {
    next(error);
  }
};

export const getStock = async (req, res, next) => {
  try {
    const stocks = await Stocks.findById(req.params.id).select(
      "-_id -__v -updatedAt"
    );
    if (!stocks) return res.status(404).json({ msg: "Stock Not Found" });

    return res.status(208).json(stocks);
  } catch (error) {
    next(error);
  }
};

export const destroy = async (req, res, next) => {
  try {
    const stocks = await Stocks.findByIdAndDelete(req.params.id);
    return res.status(404).json({ msg: "Stock Deleted" });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);
  const trx_id = generateRamdom(30);
  const hasError = !error.isEmpty();

  if (hasError) {
    res.status(422).json({ error: error.array() });
  } else {
    const options = { ordered: true };
    let stocks = [];
    req.body.stocks.map((stock, index) => {
      let total = stock.price * stock.quantity;
      stocks.push({
        ...req.body.stocks[index],
        staffId: req.user.id,
        total,
        trx_id,
      });
    });
    try {
      const newStock = await Stocks.insertMany(stocks, options);
      return res.status(200).json({ msg: "Stock uploaded successfully.." });
    } catch (error) {
      next(error);
    }
  }
};

export const updateStock = async (req, res, next) => {};
export const update = async (req, res, next) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);

  const hasError = !error.isEmpty();

  if (hasError) {
    res.status(422).json({ error: error.array() });
  } else {
    const stock = await Stocks.findById(req.params.id);
    if (!stock) return res.status(404).json({ msg: "Stock Not Found" });

    const total = req.body.price * req.body.quantity;
    const updatedStock = await Stocks.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        total: total,
        description: req.body.description,
      },
      {
        $new: true,
      }
    );

    if (stock) return res.status(201).json(updatedStock);
  }
};
