import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token =
    req.cookies.access_token || req.headers.authorization.split(" ")[1];
  if (!token) return next(createError(401, "Unauthorized Access"));

  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) return next(createError(401, "Invalid Token"));
    req.user = user;
    next();
  });
};

export const verifyManagerToken = (req, res, next) => {
  req.cookies.access_token || req.headers.authorization.split(" ")[1];
  if (!token) return next(createError(401, "Unauthorized Access"));

  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) return next(createError(401, "Invalid Token"));
    req.user = user;
    next();
  });
};

export const verifyBarToken = (req, res, next) => {
  const token =
    req.cookies.access_token || req.headers.authorization.split(" ")[1];
  if (!token) return next(createError(401, "Unauthorized Access"));

  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) return next(createError(401, "Invalid Token"));
    req.user = user;
    if (req.user.role !== "bar")
      return next(createError(401, "Unauthorized Access"));
    next();
  });
};

export const verifyLaundryToken = (req, res, next) => {
  req.cookies.access_token || req.headers.authorization.split(" ")[1];
  if (!token) return next(createError(401, "Unauthorized Access"));

  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) return next(createError(401, "Invalid Token"));
    req.user = user;
    if (req.user.role !== "laundry")
      return next(createError(401, "Unauthorized Access"));
    next();
  });
};

export const verifyMaintenanceToken = (req, res, next) => {
  req.cookies.access_token || req.headers.authorization.split(" ")[1];
  if (!token) return next(createError(401, "Unauthorized Access"));

  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) return next(createError(401, "Invalid Token"));
    req.user = user;
    if (req.user.role !== "maintenance")
      return next(createError(401, "Unauthorized Access"));
    next();
  });
};

export const verifyRestaurantToken = (req, res, next) => {
  req.cookies.access_token || req.headers.authorization.split(" ")[1];
  if (!token) return next(createError(401, "Unauthorized Access"));

  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) return next(createError(401, "Invalid Token"));
    req.user = user;
    if (req.user.role !== "restaurant")
      return next(createError(401, "Unauthorized Access"));
    next();
  });
};

export const verifyKitchenToken = (req, res, next) => {
  req.cookies.access_token || req.headers.authorization.split(" ")[1];
  if (!token) return next(createError(401, "Unauthorized Access"));

  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) return next(createError(401, "Invalid Token"));
    req.user = user;
    if (req.user.role !== "kitchen")
      return next(createError(401, "Unauthorized Access"));
    next();
  });
};

export const verifyReceptionistToken = (req, res, next) => {
  const token =
    req.cookies.access_token || req.headers.authorization.split(" ")[1];
  if (!token) return next(createError(401, "Unauthorized Access"));

  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) return next(createError(401, "Invalid Token"));
    req.user = user;
    if (req.user.role !== "receptionist")
      return next(createError(401, "Unauthorized Access"));
    next();
  });
};

export const verifyStoreKeeperToken = (req, res, next) => {
  const token =
    req.cookies.access_token || req.headers.authorization.split(" ")[1];
  if (!token) return next(createError(401, "Unauthorized Access"));

  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) return next(createError(401, "Invalid Token"));
    req.user = user;
    if (req.user.role !== "store-keeper")
      return next(createError(401, "Unauthorized Access"));
    next();
  });
};
