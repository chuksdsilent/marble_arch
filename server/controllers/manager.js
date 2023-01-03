import { createError } from "../error.js";
import validator from "express-validator";
const { validationResult } = validator;

import Booking from "../models/Booking.js";
import User from "../models/User.js";
import GuestInformation from "../models/GuestInformation.js";
import {
  getTodayBar,
  getTodayBookings,
  getTodayGuests,
  getTodayLaundry,
  getTodayMaintenance,
  getTodayRestaurant,
  getTodayStockDispatched,
  getTodayStocks,
} from "./QueryTodayTransactionTotals.js";
import {
  getBar,
  getBookings,
  getExpenses,
  getGuests,
  getLaundry,
  getMaintenance,
  getRestaurant,
  getStockDispatched,
  getStocks,
  getUsers,
} from "./QueryAllTransactionTotals.js";
import { todayPipeline } from "../GlobalVarialbles.js";

export const getDashboardData = async (req, res, next) => {
  try {
    const laundry = await getLaundry(req, res, next);
    const bar = await getBar(req, res, next);
    const restaurant = await getRestaurant(req, res, next);
    const maintenance = await getMaintenance(req, res, next);
    const dispatchedStocks = await getStockDispatched(req, res, next);
    const bookings = await getBookings(req, res, next);
    const guests = await getGuests(req, res, next);
    const expenses = await getExpenses(req, res, next);
    const users = await getUsers(req, res, next);
    const dashboardStocks = await getStocks(req, res, next);
    const todayBooking = await getTodayBookings(req, res, next);
    const todayStock = await getTodayStocks(req, res, next);
    const todayStockDispatched = await getTodayStockDispatched(req, res, next);
    const todayGuests = await getTodayGuests(req, res, next);
    const todayBar = await getTodayBar(req, res, next);
    const todayRestaurant = await getTodayRestaurant(req, res, next);
    const todayLaundry = await getTodayLaundry(req, res, next);
    const todayMaintenance = await getTodayMaintenance(req, res, next);

    // let data = [
    //   {
    //     title: "Booking",
    //     value: todayBooking[0].total,
    //     icon: "bi-briefcase",
    //     footer: "Today",
    //     currency: "&#8358;",
    //     url: "/manager/bookings",
    //   },
    //   {
    //     title: "Stocks",
    //     value: todayStock[0].total,
    //     icon: "bi-cassette-fill",
    //     footer: "Today",
    //     currency: "&#8358;",
    //     url: "/manager/stock-inventory",
    //   },
    //   {
    //     title: "Stock Dispatched",
    //     value: todayStockDispatched[0].total,
    //     icon: "bi-database",
    //     footer: "Today",
    //     currency: "&#8358;",
    //     url: "/manager/dispatched-stocks",
    //   },
    //   {
    //     title: "Restaurant",
    //     value: todayRestaurant[0].total,
    //     icon: "bi-grid-1x2-fill",
    //     footer: "Today",
    //     currency: "&#8358;",
    //     url: "/manager/restaurant",
    //   },
    //   {
    //     title: "Bar",
    //     value: todayBar[0].total,
    //     icon: "bi-fan",
    //     footer: "Today",
    //     currency: "&#8358;",
    //     url: "/manager/bar",
    //   },
    //   {
    //     title: "Laundry",
    //     value: todayLaundry[0].total,
    //     icon: "bi-calendar-fill",
    //     footer: "Today",
    //     currency: "&#8358;",
    //     url: "/manager/laundry",
    //   },
    //   {
    //     title: "Maintenance",
    //     value: todayMaintenance[0].total,
    //     icon: "bi-building-fill-gear",
    //     footer: "Today",
    //     currency: "&#8358;",
    //     url: "/manager/maintenance",
    //   },
    //   {
    //     title: "Guests",
    //     value: todayGuests[0].total,
    //     icon: "bi-hexagon-half",
    //     footer: "Today",
    //     currency: "",
    //     url: "/manager/guests",
    //   },

    //   {
    //     title: "Bookings",
    //     value: bookings[0].total,
    //     icon: "bi-kanban-fill",
    //     footer: "All Time",
    //     currency: "&#8358;",
    //     url: "/manager/bookings",
    //   },
    //   {
    //     title: "Stocks",
    //     value: dashboardStocks[0].total,
    //     icon: "bi-cassette-fill",
    //     footer: "All Time",
    //     currency: "&#8358;",
    //     url: "/manager/stock-inventory",
    //   },
    //   {
    //     title: "Dispatched Stocks",
    //     value: 54524,
    //     // value: dispatchedStocks[0].total,
    //     icon: "bi-table",
    //     footer: "All Time",
    //     currency: "&#8358;",
    //     url: "/manager/dispatched-stocks",
    //   },
    //   {
    //     title: "Restaurant",
    //     value: restaurant[0].total,
    //     icon: "bi-grid-1x2-fill",
    //     footer: "All Time",
    //     currency: "&#8358;",
    //     url: "/manager/restaurant",
    //   },
    //   {
    //     title: "Bar",
    //     value: bar[0].total,
    //     icon: "bi-fan",
    //     footer: "All Time",
    //     currency: "&#8358;",
    //     url: "/manager/bar",
    //   },
    //   {
    //     title: "Maintenance",
    //     value: maintenance[0].total,
    //     icon: "bi-building-fill-gear",
    //     footer: "All Time",
    //     currency: "&#8358;",
    //     url: "/manager/maintenance",
    //   },
    //   {
    //     title: "Laundry",
    //     value: laundry[0].total,
    //     icon: "bi-calendar-fill",
    //     footer: "All Time",
    //     currency: "&#8358;",
    //     url: "/manager/laundry",
    //   },
    //   {
    //     title: "Expenses",
    //     value: expenses[0].amount,
    //     icon: "bi-bricks",
    //     footer: "All Time",
    //     currency: "&#8358;",
    //     url: "/manager/expenses",
    //   },

    //   {
    //     title: "Guests",
    //     value: 5478,
    //     // value: guests[0].total,
    //     icon: "bi-hexagon-half",
    //     footer: "All Time",
    //     currency: "",
    //     url: "/manager/guests",
    //   },
    //   {
    //     title: "Staff",
    //     value: users[0].total,
    //     icon: "bi-people-fill",
    //     footer: "All Time",
    //     currency: "",
    //   },
    // ];
    // return res.status(200).json(data);
    return res.status(200).json("This is coming from dashoard");
  } catch (error) {
    next(error);
  }
};

export const changeStaffRole = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          role: req.body.role,
        },
      },
      { $new: true }
    )
      .select("-updatedAt -__v -password -passwordChanged")
      .sort({ createdAt: -1 });

    if (!user) return res.status(404).json({ msg: "No user Found" });

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const unSuspendStaffs = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          suspended: false,
        },
      },
      { $new: true }
    )
      .select("-updatedAt -__v -password -passwordChanged")
      .sort({ createdAt: -1 });

    if (!user) return res.status(404).json({ msg: "No user Found" });

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const suspendStaffs = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { suspended: true },
      { $new: true }
    )
      .select("-updatedAt -__v -password -passwordChanged")
      .sort({ createdAt: -1 });

    if (!user) return res.status(404).json({ msg: "No user Found" });

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllGuests = async (req, res, next) => {
  let user;
  console.log("query is ", req.query.query);
  try {
    if (req.query.query == "today") {
      user = await GuestInformation.find(todayPipeline)
        .populate("staffId", "-password")
        .select("-updatedAt -__v -password -passwordChanged")
        .sort({ createdAt: -1 });
    } else {
      user = await GuestInformation.find({})
        .populate("staffId", "-password")
        .select("-updatedAt -__v -password -passwordChanged")
        .sort({ createdAt: -1 });
    }
    if (!user) return res.status(404).json({ msg: "No Guest(s) Found" });

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getGuest = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const user = await Booking.find({ guestId: req.params.id })
      .populate("staffId", "-password")
      .populate({ path: "guestId", model: GuestInformation })
      .select("-updatedAt -__v -password -passwordChanged")
      .sort({ createdAt: -1 });

    if (!user) return res.status(404).json({ msg: "No Guest(s) Found" });

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllStaffs = async (req, res, next) => {
  try {
    const user = await User.find({})
      .select("-updatedAt -__v -password -passwordChanged")
      .sort({ createdAt: -1 });

    if (!user) return res.status(404).json({ msg: "No user Found" });

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllBookedRooms = async (req, res, next) => {
  try {
    const booking = await Booking.find({ booked: true })
      .populate("staffId", "-password")
      .sort({ createdAt: -1 });

    return res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

export const getAllBookings = async (req, res, next) => {
  let booking = [];

  try {
    if (req.query.query === "today") {
      booking = await Booking.find(todayPipeline)
        .populate("guestId")
        .select("-updatedAt -__v")
        .sort({ createdAt: -1 });
    } else {
      booking = await Booking.find({})
        .populate("guestId")
        .select("-updatedAt -__v")
        .sort({ createdAt: -1 });
    }
    if (!booking) return res.status(404).json("No Booking Found");

    return res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

export const searchBookings = async (req, res, next) => {
  let booking = [];
  try {
    booking = await Booking.find({
      createdAt: {
        $gte: new Date(req.body.startDate),
        $lt: new Date(req.body.endDate),
      },
    })
      .populate("staffId")
      .select("-_id -updatedAt -__v")
      .sort({ createdAt: -1 });

    if (!booking) return res.status(404).json("No Booking Found");

    return res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

export const getAllBookingsToday = async (req, res, next) => {
  var startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  // creates ObjectId() from date:
  var _id =
    Math.floor(startOfToday.getTime() / 1000).toString(16) + "0000000000000000";

  try {
    const booking = await Booking.find({ _id: { $gte: _id } })
      .select("-_id -updatedAt -__v")
      .sort({ createdAt: -1 });

    if (!booking) return res.status(404).json("No Booking Found");

    return res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};
