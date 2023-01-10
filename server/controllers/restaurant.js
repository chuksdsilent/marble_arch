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
    console.log("orders ", orders);
    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const updateRestaurantOrderRequest = async (req, res, next) => {
  console.log("welcome to home in...");
  try {
    const order = await Restaurant.findById(req.params.id);
    if (!order)
      return res.status(404).json({ msg: "No Restaurant Order Found" });

    const total = req.body.price * req.body.quantity;
    const orderRequest = await Restaurant.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        total: total,
        description: req.body.description,
      },
      { $new: true }
    );

    return res.status(200).json(orderRequest);
  } catch (error) {
    next(error);
  }
};
export const getRestaurantOrder = async (req, res, next) => {
  try {
    const restaurantOrder = await Restaurant.findById(req.params.id).populate(
      "menuId"
    );

    if (!restaurantOrder)
      return res.status(200).json({ msg: "No Restaurant Order Found" });

    return res.status(200).json(restaurantOrder);
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
export const getMenu = async (req, res, next) => {
  let menu;
  try {
    menu = await Menu.findById(req.params.menuId)
      .select("-__v -updatedAt")
      .sort({ createdAt: -1 });
    if (!menu) return res.status(208).json({ msg: "No Menu Found" });

    menu = await Menu.findById(req.params.menuId).select("-__v -updatedAt");

    return res.status(208).json(menu);
  } catch (error) {
    next(error);
  }
};
export const updateMenu = async (req, res, next) => {
  let menu;
  try {
    menu = await Menu.findById(req.params.menuId)
      .select("-__v -updatedAt")
      .sort({ createdAt: -1 });
    if (!menu) return res.status(208).json({ msg: "No Menu Found" });

    menu = await Menu.findOneAndUpdate(
      { _id: req.params.menuId },
      req.body
    ).select("-__v -updatedAt");

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
      menu = await Restaurant.find(todayPipeline)
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
    for (let [index, stock] of req.body.stocks.entries()) {
      const menus = await Menu.findOne({
        _id: stock.menuId,
      }).select("-__v -updatedAt");

      if (!menus) {
        valid = false;
        return res.status(404).json({ msg: "Order Not Found." });
      }

      let total = stock.price * stock.quantity;
      console.log("total is ", stock.quantity);
      user_menus.push({
        ...stock,
        staffId: req.user.id,
        total: total,
        quantity: stock.quantity,
        trx_id,
        price: menus.price,
        total,
        menuId: stock.menuId,
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
