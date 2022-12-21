import validator from "express-validator";
const { validationResult } = validator;
import Menu from "../models/Menu.js";
import StockDispatch from "../models/StockDispatch.js";

export const index = async (req, res, next) => {
  console.log("The console");
  try {
    const menu = await Menu.find({
      quantity: { $gt: 0 },
    })
      .select(" -__v")
      .sort({ createdAt: -1 });
    return res.status(200).json(menu);
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
    const newMenu = new Menu({ ...req.body, staffId: req.user.id });
    try {
      const savedMenu = await newMenu.save();

      return res.status(200).json(savedMenu);
    } catch (error) {
      next(error);
    }
  }
};

export const update = async (req, res, next) => {
  const filter = { _id: req.params.id };
  const update = { price: req.body.price };
  const opts = { new: true, upsert: true };

  const menu = await Menu.findOne(filter);
  if (!menu) res.status(400).json({ msg: "Menu Not Found" });

  const updatedmenu = await Menu.findOneAndUpdate(filter, update, opts);
  if (updatedmenu) res.status(200).json({ msg: "menu price updated..." });
};
