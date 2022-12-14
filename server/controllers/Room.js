import validator from "express-validator";
const { validationResult } = validator;
import Rooms from "../models/Rooms.js";

export const addRoom = async (req, res, next) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);

  const hasError = !error.isEmpty();

  if (hasError) {
    res.status(422).json({ error: error.array() });
  } else {
    const room = await Rooms.findOne({ roomNumber: req.body.roomNumber });
    if (room) return res.status(208).json({ msg: "Room already exists" });

    const newRoom = new Rooms({ ...req.body, staffId: req.user.id });
    try {
      const savedRoom = await newRoom.save();

      return res.status(200).json(savedRoom);
    } catch (error) {
      next(error);
    }
  }
};

export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Rooms.find({});
    return res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};
export const updateRoomPrice = async (req, res, next) => {
  const filter = { _id: req.params.id };
  const update = { price: req.body.price };
  const opts = { new: true, upsert: true };

  const room = await Rooms.findOne(filter);
  if (!room) res.status(404).json({ msg: "Room Not Found" });

  const updatedRoom = await Rooms.findOneAndUpdate(filter, update, opts);
  if (updatedRoom) res.status(200).json({ msg: "Room price updated..." });
};
