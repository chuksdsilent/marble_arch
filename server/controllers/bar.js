import mongoose from "mongoose";
import { response } from "express";
import Bar from "../models/Bar.js";
import { createError } from "../error.js";
import validator from "express-validator";
const { validationResult } = validator;
import { generateRamdom } from "../utils/Utils.js";
import StockDispatches from "../models/StockDispatch.js";
import BarItems from "../models/BarItems.js";
import { todayPipeline } from "../GlobalVarialbles.js";
import Menu from "../models/Menu.js";

export const searchBarOrders = async (req, res, next) => {
  let barOrders = [];
  try {
    barOrders = await Bar.find({
      createdAt: {
        $gte: new Date(req.body.startDate),
        $lt: new Date(req.body.endDate),
      },
    })
      .populate("stockId")
      .select("-_id -updatedAt -__v")
      .sort({ createdAt: -1 });

    if (!barOrders) return res.status(404).json("No Bar Order Found");

    return res.status(200).json(barOrders);
  } catch (error) {
    next(error);
  }
};

export const acceptStockSent = async (req, res, next) => {
  try {
    const stockDispatched = await StockDispatches.findOneAndUpdate(
      { _id: req.params.stockId, department: "bar" },
      { received: true },
      { $new: true }
    )
      .select("-__v -updatedAt")
      .sort({ x: -1 });

    if (!stockDispatched)
      return res.status(208).json({ msg: "No stock Found" });

    return res.status(208).json(stockDispatched);
  } catch (error) {
    next(error);
  }
};
export const printReceipt = async (req, res, next) => {
  try {
    const order = await Bar.findById(req.params.id).select("-__v -updatedAt");
    if (!order) return res.status(208).json({ msg: "No Order Found" });
    return res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};
export const getAllStockSent = async (req, res, next) => {
  let stock;
  try {
    const stockDispatched = await StockDispatches.find({})
      .select("-__v -updatedAt")
      .sort({ createdAt: -1 });
    if (!stockDispatched)
      return res.status(208).json({ msg: "No stock Found" });
    return res.status(208).json(stockDispatched);
  } catch (error) {
    next(error);
  }
};

export const getBarOrders = async (req, res, next) => {
  let stock = [];
  try {
    if (req.query.query == "today") {
      stock = await Bar.find(todayPipeline)
        .populate("stockId")
        .select("-__v -updatedAt")
        .sort({ createdAt: -1 });
    } else {
      stock = await Bar.find({})
        .populate("stockId", "name")
        .select("-__v -updatedAt")
        .sort({ x: -1 });
    }
    if (stock.length === 0) return res.status(208).json(stock);

    return res.status(208).json(stock);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);
  const trx_id = generateRamdom(30);
  const hasError = !error.isEmpty();
  let user_orders = [];
  if (hasError) {
    res.status(422).json({ error: error.array() });
  } else {
    const options = { ordered: true };
    let user_orders = [];
    let qtyExceeded = false;
    for (let [index, order] of req.body.stocks.entries()) {
      const stock = await StockDispatches.findOne({
        _id: order.stockId,
      }).populate("stockId");
      if (!stock) return res.status(404).json({ msg: "Stock Not Found" });

      let total = order.price * order.quantity;

      if (order.quantity > stock.quantity) {
        return res.status(422).json({
          msg: `Quantity of ${stock.stockId.name} is greater than what we have in database`,
        });
      }

      let newQty = stock.quantity - order.quantity;
      let newTotal = newQty * stock.price;

      const updatedStock = await StockDispatches.findOneAndUpdate(
        { _id: stock._id },
        { quantity: newQty, total: newTotal },
        { $new: true }
      );
      if (!updatedStock)
        return res.status(500).json({ msg: "Error. Please try again." });

      user_orders.push({
        ...order,
        staffId: req.user.id,
        total,
        trx_id,
        price: order.price,
        total,
      });
    }

    try {
      const stock = await Bar.insertMany(user_orders, options);
      if (!stock)
        return res.status(500).json({ msg: "Error. Please try again." });

      return res.status(200).json({ msg: "stock uploaded successfully.." });
    } catch (error) {
      next(error);
    }
  }
};
