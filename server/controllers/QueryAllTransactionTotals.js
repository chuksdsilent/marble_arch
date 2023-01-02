import Booking from "../models/Booking.js";
import GuestInformation from "../models/GuestInformation.js";
import User from "../models/User.js";
import Stocks from "../models/Stocks.js";
import StockDispatches from "../models/StockDispatch.js";
import Expenses from "../models/Expenses.js";
import { allPipeline } from "../GlobalVarialbles.js";
import Restaurant from "../models/Restaurant.js";
import Bar from "../models/Bar.js";
import Laundry from "../models/laundry.js";
import Maintenance from "../models/maintenance.js";
export const getMaintenance = async (req, res, next) => {
  try {
    let maintenance = await Maintenance.aggregate(allPipeline);
    if (maintenance.length === 0)
      return (maintenance = [{ _id: null, total: 0 }]);

    return maintenance;
  } catch (error) {
    console.log("The error is ", error);
  }
};
export const getLaundry = async (req, res, next) => {
  try {
    let laundry = await Laundry.aggregate(allPipeline);
    if (laundry.length === 0) return (laundry = [{ _id: null, price: 0 }]);
    return laundry;
  } catch (error) {
    console.log("The error is ", error);
  }
};
export const getRestaurant = async (req, res, next) => {
  try {
    let restaurant = await Restaurant.aggregate(allPipeline);
    if (restaurant.length === 0)
      return (restaurant = [{ _id: null, total: 0 }]);

    return restaurant;
  } catch (error) {
    console.log("The error is ", error);
  }
};
export const getBar = async (req, res, next) => {
  try {
    let bar = await Bar.aggregate(allPipeline);
    if (bar.length === 0) return (bar = [{ _id: null, total: 0 }]);
    return bar;
  } catch (error) {
    console.log("The error is ", error);
  }
};
export const getStockDispatched = async (req, res, next) => {
  try {
    const stockDispatched = await StockDispatches.aggregate([
      {
        $group: { _id: null, total: { $sum: "$total" } },
      },
    ]);
    if (stockDispatched.length === 0)
      return (stockDispatched = [{ _id: null, total: 0 }]);

    return stockDispatched;
  } catch (error) {
    next(error);
  }
};

export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.aggregate([
      {
        $group: { _id: null, total: { $sum: "$total" } },
      },
    ]);
    if (bookings.length === 0) return (bookings = [{ _id: null, total: 0 }]);

    return bookings;
  } catch (error) {
    next(error);
  }
};

export const getStocks = async (req, res, next) => {
  try {
    const stocks = await Stocks.aggregate([
      {
        $group: { _id: null, total: { $sum: "$total" } },
      },
    ]);
    if (stocks.length === 0) return (stocks = [{ _id: null, total: 0 }]);

    return stocks;
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.aggregate([
      {
        $group: { _id: null, total: { $count: {} } },
      },
    ]);
    if (users.length === 0) return (users = [{ _id: null, total: 0 }]);

    return users;
  } catch (error) {
    next(error);
  }
};

export const getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expenses.aggregate([
      {
        $group: { _id: null, amount: { $sum: "$amount" } },
      },
    ]);
    console.log(expenses);
    if (expenses.length === 0) return (expenses = [{ _id: null, amount: 0 }]);

    return expenses;
  } catch (error) {
    next(error);
  }
};

export const getGuests = async (req, res, next) => {
  try {
    const guests = await GuestInformation.aggregate([
      {
        $group: { _id: null, total: { $count: {} } },
      },
    ]);
    if (guests.length === 0) return (guests = [{ _id: null, total: 0 }]);

    return guests;
  } catch (error) {
    next(error);
  }
};
