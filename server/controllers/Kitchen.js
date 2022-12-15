import mongoose from "mongoose";
import { createError } from "../error.js";
import NewStockRequest from "../models/NewStockRequest.js";
import Pusher from "pusher";
export const newStockRequest = async (req, res, next) => {
  try {
    const newStockRequest = await NewStockRequest.insertMany(req.body);
    if (!newStockRequest)
      return res.status(404).json({ message: "Error Occurred." });

    // const pusher = new Pusher({
    //   appId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    //   key: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    //   secret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    //   cluster: "eu",
    //   useTLS: true,
    // });

    // pusher.trigger("my-channel", "store-keeper", {
    //   message: "New Stock Request",
    //   department: req.body.department,
    // });

    return res.status(200).json(newStockRequest);
  } catch (error) {
    createError(error);
  }
};

export const getStockRequest = async (req, res, next) => {
  try {
    let stockRequest;
    if (req.query.department == "store-keeper") {
      stockRequest = await NewStockRequest.find({}).sort({ createdAt: -1 });
    } else {
      stockRequest = await NewStockRequest.find({
        department: req.query.department,
      }).sort({ createdAt: -1 });
    }

    if (!newStockRequest)
      return res.status(404).json({ message: "Error Occured." });

    return res.status(200).json(stockRequest);
  } catch (error) {
    createError(error);
  }
};
