import { createError } from "../error.js";
import validator from "express-validator";
const { validationResult } = validator;
import StockDispatches from "../models/StockDispatch.js";
import Laundry from "../models/Laundry.js";
import Stocks from "../models/Stocks.js";

export const acceptStockSent = async (req, res, next) => {
  try {
    const stockDispatched = await StockDispatches.findOneAndUpdate(
      { trx_id: req.params.trxId, department: "laundry" },
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

export const laundryUsedStocks = async (req, res, next) => {
  try {
    const stocks = await Laundry.find({})
      .populate("stockId", "name")
      .select("-updatedAt -__v")
      .sort({ createdAt: -1 });
    if (!stocks) return res.status(404).json("No Stocks Found");
    return res.status(200).json(stocks);
  } catch (error) {
    next(error);
  }
};

export const index = async (req, res, next) => {
  try {
    const stockDispatches = await StockDispatches.find({
      department: "laundry",
    })
      .select("-updatedAt -__v")
      .sort({ createdAt: -1 });
    if (!stockDispatches)
      return res.status(404).json("No Stock Dispatched Found");
    return res.status(200).json(stockDispatches);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);
  const hasError = !error.isEmpty();
  let user_items = [];
  let qtyExceeded = false;
  if (hasError) {
    res.status(422).json({ error: error.array() });
  } else {
    const options = { ordered: true };
    let user_items = [];
    for (let [index, item] of req.body.items.entries()) {
      const stock = await StockDispatches.findOne({
        _id: item.stockId,
        department: "laundry",
      })
        .select("-__v -updatedAt")
        .sort({ createdAt: -1 })
        .limit(1);
      if (!stock) return res.status(404).json({ msg: "Stock Not Found." });

      let total = stock.price * item?.quantity;
      const stoks = await Stocks.findOne({ _id: stock.stockId });

      if (item.quantity > stock.quantity) {
        return res.status(208).json({
          msg: `Quantity of ${stoks.name} is greater than what we have in database`,
        });
        qtyExceeded = true;
      }
      let newQty = stock.quantity - item.quantity;
      let newTotal = newQty * stock.price;

      const updatedStock = await StockDispatches.findOneAndUpdate(
        { _id: stock._id },
        { quantity: newQty, total: newTotal },
        { $new: true }
      );
      if (!updatedStock)
        return res.status(500).json({ msg: "Error. Please try again." });

      user_items.push({
        ...item,
        staffId: req.user.id,
        price: stock.price,
        total,
      });
    }
    try {
      const stock = await Laundry.insertMany(user_items, options);
      if (!stock)
        return res.status(500).json({ msg: "Error. Please try again." });

      if (qtyExceeded === false)
        return res.status(200).json({ msg: "stock uploaded successfully.." });
    } catch (error) {
      next(error);
    }
  }
};
