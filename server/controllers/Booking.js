import { createError } from "../error.js";
import GuestInformation from "../models/GuestInformation.js";
import Rooms from "../models/Rooms.js";
import Booking from "../models/Booking.js";
import validator from "express-validator";
import { todayPipeline } from "../GlobalVarialbles.js";
const { validationResult } = validator;

export const booking = async (req, res, next) => {
  let guest_info = {
    surname: req.body.surname,
    firstName: req.body.firstName,
    gender: req.body.gender,
    nationality: req.body.nationality,
    occupation: req.body.occupation,
    phone: req.body.phone,
    address: req.body.address,
    staffId: req.user.id,
  };

  let timeBtwDate =
    new Date(req.body.departureDate).getTime() -
    new Date(req.body.arrivalDate).getTime();
  let daysBtwDate = Math.ceil(timeBtwDate / (1000 * 3600 * 24));

  const room = await Rooms.findOne({ _id: req.body.room });
  if (!room) return res.status(404).json({ msg: "Room Not Found." });
  let total = room.price * daysBtwDate;

  let booking = {
    roomId: room._id,
    guestId: req.body.guestId,
    staffId: req.user.id,
    arrivalDate: req.body.arrivalDate,
    departureDate: req.body.departureDate,
    roomType: room.roomType,
    roomNumber: room.roomNumber,
    discount: req.body.discount,
    price: room.price,
    booked: true,
    paymentMethod: req.body.paymentMethod,
    total,
  };

  const error = validationResult(req).formatWith(({ msg }) => msg);

  const hasError = !error.isEmpty();

  if (hasError) {
    res.status(422).json({ error: error.array() });
  } else {
    const guest = await GuestInformation.findOne({ phone: req.body.phone });
    if (guest) return res.status(422).json({ msg: "Guest already exists" });

    try {
      const newGuest = new GuestInformation(guest_info);
      const savedGuest = await newGuest.save();

      booking = { ...booking, guestId: savedGuest._id };
      const newBooking = new Booking(booking);

      const savedBooking = await newBooking.save();
      const roomBooked = await Rooms.findOneAndUpdate(
        { roomNumber: room.roomNumber },
        { booked: true },
        { $new: true }
      );

      return res.status(200).json(roomBooked);
    } catch (error) {
      next(error);
    }
  }
};

export const bookingWithOldGuest = async (req, res, next) => {
  let timeBtwDate =
    new Date(req.body.departureDate).getTime() -
    new Date(req.body.arrivalDate).getTime();
  let daysBtwDate = Math.ceil(timeBtwDate / (1000 * 3600 * 24));

  const guest = await GuestInformation.findOne({ phone: req.body.phone });

  const room = await Rooms.findOne({ _id: req.body.room });
  if (!room) return res.status(404).json({ msg: "Room Not Found." });
  let total = room.price * daysBtwDate;

  let booking = {
    roomId: room._id,
    staffId: req.user.id,
    arrivalDate: req.body.arrivalDate,
    departureDate: req.body.departureDate,
    roomType: room.roomType,
    roomNumber: room.roomNumber,
    price: room.price,
    booked: true,
    paymentMethod: req.body.paymentMethod,
    total,
  };

  const error = validationResult(req).formatWith(({ msg }) => msg);

  const hasError = !error.isEmpty();

  if (hasError) {
    res.status(422).json({ error: error.array() });
  } else {
    try {
      const newGuest = new GuestInformation(guest);
      const savedGuest = await newGuest.save();

      booking = { ...booking, guestId: savedGuest._id };
      const newBooking = new Booking(booking);

      const savedBooking = await newBooking.save();
      const roomBooked = await Rooms.findOneAndUpdate(
        { roomNumber: room.roomNumber },
        { booked: true },
        { $new: true }
      );

      return res.status(200).json(roomBooked);
    } catch (error) {
      next(error);
    }
  }
};

export const transferGuest = async (req, res, next) => {
  const guest = await Booking.findOne({
    roomNumber: req.body.roomNumber,
    booked: true,
  }).sort({ createdAt: -1 });
  if (!guest) return res.status(404).json({ msg: "Booking Not Found." });

  const room = await Rooms.findOne({ roomNumber: req.body.roomNumber });
  if (room.length == 0) return res.status(404).json({ msg: "Room Not Found." });

  let booking = {
    guestId: guest.guestId,
    staffId: req.user.id,
    arrivalDate: req.body.arrivalDate,
    departureDate: req.body.departureDate,
    roomType: room.roomType,
    roomNumber: req.body.roomNumber,
    price: room.price,
    booked: true,
    transferred: true,
    transferredTo: req.body.transferredTo,
    paymentMethod: req.body.paymentMethod,
  };

  const error = validationResult(req).formatWith(({ msg }) => msg);

  const hasError = !error.isEmpty();

  if (hasError) {
    res.status(422).json({ error: error.array() });
  } else {
    try {
      const updateBooking = await Booking.findOneAndUpdate(
        { roomNumber: req.body.roomNumber, booked: true },
        { booked: false },
        { $new: true }
      ).sort({ createdAt: -1 });

      const newBooking = new Booking(booking);
      const savedBooking = await newBooking.save();
      if (!savedBooking)
        return next(createError(403, "Network Error. Please try again."));
      return res.status(200).json({ msg: "Guest transferred successfully..." });
    } catch (error) {
      next(error);
    }
  }
};

export const updateGuest = async (req, res, next) => {
  let guest_info = {
    surname: req.body.surname,
    firstName: req.body.firstName,
    gender: req.body.gender,
    nationality: req.body.nationality,
    occupation: req.body.occupation,
    phone: req.body.phone,
    address: req.body.address,
    staffId: req.user.id,
  };

  const error = validationResult(req).formatWith(({ msg }) => msg);

  const hasError = !error.isEmpty();

  if (hasError) {
    res.status(422).json({ error: error.array() });
  } else {
    const guest = await GuestInformation.findOne({ _id: req.params.id });
    if (!guest) res.status(208).json({ msg: "Guest does not exist" });

    try {
      const updated_guest = await GuestInformation.findOneAndUpdate(
        { _id: req.params.id },
        guest_info,
        { $new: true }
      );
      if (!updateGuest)
        res.status(208).json({ msg: "Network Error. Please Try Again" });

      return res
        .status(200)
        .json({ msg: "Guest Information Updated Successfully..." });
    } catch (error) {
      next(error);
    }
  }
};

export const checkOutGuest = async (req, res, next) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);

  const hasError = !error.isEmpty();

  if (hasError) {
    res.status(422).json({ error: error.array() });
  } else {
    const booking = await Booking.findOne({
      _id: req.params.roomNumber,
    });

    if (!booking) return res.status(404).json({ msg: "Booking Not Found" });

    // $and: [
    //   {
    //     $or: [
    //       { roomNumber: req.params.roomNumber },
    //       { transferredTo: req.params.roomNumber },
    //     ],
    //     booked: true,
    //   },
    // ],

    try {
      const updated_guest = await Booking.findOneAndUpdate(
        {
          _id: req.params.roomNumber,
        },
        { booked: false, transferred: false },
        { $new: true }
      );

      if (!updateGuest)
        return res.status(208).json({ msg: "Network Error. Please Try Again" });

      const room = await Rooms.findOneAndUpdate(
        { roomNumber: booking.roomNumber },
        { booked: false },
        { $new: true }
      );
      displayAllBooking(req, res, next);
    } catch (error) {
      next(error);
    }
  }
};

export const displayAllBooking = async (req, res, next) => {
  const all_booking = await Booking.find(todayPipeline)
    .populate("guestId", "-password")
    .sort({ createdAt: -1 });
  return res.status(200).json(all_booking);
};

export const bookedRooms = async (req, res, next) => {
  const all_booking = await Rooms.find({ booked: true }).sort({
    createdAt: -1,
  });
  return res.status(200).json(all_booking);
};

export const freeRooms = async (req, res, next) => {
  const all_booking = await Rooms.find({ booked: false }).sort({
    createdAt: -1,
  });
  return res.status(200).json(all_booking);
};

export const searchForGuest = async (req, res, next) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);

  const hasError = !error.isEmpty();

  if (hasError) {
    res.status(422).json({ error: error.array() });
  } else {
    const guest_info = await GuestInformation.findOne({
      phone: req.body.phone,
    }).select("-_id -staffId -updatedAt -__v");

    return res.status(404).json(guest_info);
  }
};
