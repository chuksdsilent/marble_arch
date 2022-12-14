import mongoose from "mongoose";
import { response } from "express";
import Restaurant from "../models/Restaurant.js";
import { createError } from "../error.js";
import validator from "express-validator";
const { validationResult } = validator;
import { generateRamdom } from "../utils/Utils.js";
import Menu from "../models/Menu.js";
import { todayPipeline } from "../GlobalVarialbles.js";

export const updateOrderRequest = async (req, res, next) => {
  try {
    const order = await Restaurant.findOneAndUpdate(
      { _id: req.params.orderId },
      { kitchen_received: true },
      { $new: true }
    );
    if (!order) return res.status(404).json({ msg: "No Order Found" });
    const orders = await Restaurant.find({})
      .populate("menuId", "name")
      .select("-__v -updatedAt")
      .sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
export const getMenuRequest = async (req, res, next) => {
  let menu;
  try {
    menu = await Restaurant.findById(req.params.menuId)
      .select("-__v -updatedAt")
      .sort({ createdAt: -1 });
    if (!menu) return res.status(208).json({ msg: "No Menu Found" });

    menu = await Restaurant.findById(req.params.menuId).select(
      "-__v -updatedAt"
    );

    return res.status(208).json(menu);
  } catch (error) {
    next(error);
  }
};

export const searchRestaurant = async (req, res, next) => {
  let menu;
  try {
    menu = await Restaurant.find({
      createdAt: {
        $gte: new Date(req.body.startDate),
        $lt: new Date(req.body.endDate),
      },
    })
      .populate("menuId", "name")
      .select("-__v -updatedAt");

    return res.status(208).json(menu);
  } catch (error) {
    next(error);
  }
};
export const getAllRestaurant = async (req, res, next) => {
  let menu = [];

  try {
    if (req.query.query == "today") {
      menu = await Restaurant.find({})
        .populate("menuId", "name")
        .select("-__v -updatedAt")
        .sort({ createdAt: -1 });
    } else {
      // [
      // {
      //   $group: {
      //     _id: "$trx_id",
      //     records: {
      //       $push: "$$ROOT",
      //     },
      //   },
      // },
      // ]
      menu = await Restaurant.find({})
        .populate("menuId", "name")
        .select("-__v -updatedAt")
        .sort({ createdAt: -1 });
    }

    return res.status(208).json(menu);
  } catch (error) {
    next(error);
  }
};

// for (let [index, stock] of req.body.stocks.entries()) { ... }
const options = { ordered: true };
let user_stocks = [];
let validQTY = true;

export const create = async (req, res, next) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);
  const trx_id = generateRamdom(30);
  const hasError = !error.isEmpty();

  if (hasError) {
    res.status(422).json({ error: error.array() });
  } else {
    const options = { ordered: true };
    let user_menus = [];
    let valid = true;
    // req.body.menus.map(async (menu, index) =>
    for (let [index, stock] of req.body.menus.entries()) {
      const menus = await Menu.findOne({
        _id: req.body.menus[index].menuId,
      }).select("-__v -updatedAt");

      if (!menus) {
        valid = false;
        return res.status(404).json({ msg: "Order Not Found." });
      }

      let total = menus.price * req.body.menus[index].qty;

      user_menus.push({
        ...req.body.menus[index],
        staffId: req.user.id,
        total: total,
        quantity: req.body.menus[index].qty,
        trx_id,
        price: menus.price,
        total,
      });
    }

    try {
      const menu = await Restaurant.insertMany(user_menus, options);
      if (!menu)
        return res.status(500).json({ msg: "Error. Please try again." });

      if (valid === true) return res.status(200).json(menu);
    } catch (error) {
      next(error);
    }
  }
};
