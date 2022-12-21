import { pipeline, stockPipeline } from "../GlobalVarialbles.js";
import Booking from "../models/Booking.js";
import Stocks from "../models/Stocks.js";
import StockDispatch from "../models/StockDispatch.js";
import GuestInformation from "../models/GuestInformation.js";
import Bar from "../models/Bar.js";
import Restaurant from "../models/Restaurant.js";
import Laundry from "../models/Laundry.js";
import Maintenance from "../models/Maintenance.js";
export const getTodayMaintenance = async (req, res, next) => {
  try {
    let todayMaintenance = await Maintenance.aggregate(pipeline);
    if (todayMaintenance.length === 0)
      return (todayMaintenance = [{ _id: null, total: 0 }]);

    return todayMaintenance;
  } catch (error) {
    console.log("The error is ", error);
  }
};
export const getTodayLaundry = async (req, res, next) => {
  try {
    let todayLaundry = await Laundry.aggregate(pipeline);
    if (todayLaundry.length === 0)
      return (todayLaundry = [{ _id: null, total: 0 }]);

    return todayLaundry;
  } catch (error) {
    console.log("The error is ", error);
  }
};
export const getTodayRestaurant = async (req, res, next) => {
  try {
    let todayRestaurant = await Restaurant.aggregate(stockPipeline);
    if (todayRestaurant.length === 0)
      return (todayRestaurant = [{ _id: null, total: 0 }]);

    return todayRestaurant;
  } catch (error) {
    console.log("The error is ", error);
  }
};
export const getTodayBar = async (req, res, next) => {
  try {
    let todayBar = await Bar.aggregate(stockPipeline);
    console.log("bar is ", todayBar);
    if (todayBar.length === 0) return (todayBar = [{ _id: null, total: 0 }]);

    return todayBar;
  } catch (error) {
    console.log("The error is ", error);
  }
};
export const getTodayBookings = async (req, res, next) => {
  try {
    let todayBooking = await Booking.aggregate(stockPipeline);
    if (todayBooking.length === 0)
      return (todayBooking = [{ _id: null, total: 0 }]);

    return todayBooking;
  } catch (error) {
    console.log("The error is ", error);
  }
};
export const getTodayStocks = async (req, res, next) => {
  try {
    let todayStock = await Stocks.aggregate(stockPipeline);
    if (todayStock.length === 0)
      return (todayStock = [{ _id: null, total: 0 }]);

    return todayStock;
  } catch (error) {
    console.log("The error is ", error);
  }
};
export const getTodayStockDispatched = async (req, res, next) => {
  try {
    let todayStockDispatched = await StockDispatch.aggregate(stockPipeline);
    if (todayStockDispatched.length === 0)
      return (todayStockDispatched = [{ _id: null, total: 0 }]);

    return todayStockDispatched;
  } catch (error) {
    console.log("The error is ", error);
  }
};
export const getTodayGuests = async (req, res, next) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  try {
    let todayGuests = await GuestInformation.countDocuments({
      createdAt: { $gte: today },
    });

    if (todayGuests.length === 0)
      return (todayGuests = [{ _id: null, total: 0 }]);

    return (todayGuests = [{ _id: null, total: todayGuests }]);
  } catch (error) {
    console.log("The error is ", error);
  }
};
