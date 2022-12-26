import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { response } from "express";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";
import validator from "express-validator";
const { validationResult } = validator;

export const getUser = async (req, res, next) => {
  try {
    const user = User.findById(req.user._id);
    if (!user) return res.status(404).json({ msg: "User Not Found" });
    return res.status(404).json(user);
  } catch (error) {
    next(createError(500, error));
  }
};
export const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array());
  } else {
    try {
      const user = await User.find({
        $or: [{ phone: req.body.phone }, { username: req.body.username }],
      });
      if (user.length > 0)
        return res.status(422).json({ msg: "Staff already exist..." });
      const salt = bcrypt.genSaltSync(10);
      const password = bcrypt.hashSync(123456, salt);
      const newUser = new User({ ...req.body, password });

      await newUser.save();
      res.status(201).json({ msg: "Staff created Successfully..." });
    } catch (error) {
      next(error);
      // next(createError(404, "Not Found"))
    }
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      $or: [{ phone: req.body.phone }, { username: req.body.username }],
    });
    if (!user) return res.status(401).json({ msg: "Wrong Credentials" });

    const isCorrect = bcrypt.compareSync(req.body.password, user.password); // true

    if (!isCorrect) return res.status(401).json({ msg: "Wrong Credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_TOKEN
    );

    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        // maxAge: 60 * 60 * 24 * 7,
      })
      .status(200)
      .json(others);
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  res.clearCookie("access_token");
  res.status(200).json({ message: "You are logged out" });
};

export const changePassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).json({ msg: "User Not Found" });

    const isPasswordCorrect = await bcrypt
      .compare(req.body.oldPassword, user.password)
      .then(function (res) {
        return res;
      });
    if (!isPasswordCorrect)
      return res.status(422).json({ message: "Old Password Incorrect" });

    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.newPassword, salt);
    const updatedPassword = await User.findOneAndUpdate(
      { username: req.body.username },
      { password: password },
      { $new: true }
    );

    if (!updatedPassword)
      return res.status(422).json({ message: "Error. Please try again." });
    return res.status(200).json({ msg: "Password changed Successfully..." });
  } catch (error) {
    console.log(error);
  }
};
