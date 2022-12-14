import validator from "express-validator";
const { check } = validator;

export const addStockValidator = [
  check("stocks.*.name", "You must enter the name of the stock")
    .not()
    .isEmpty(),
  check("stocks.*.quantity", "You must enter the quantity of the stock")
    .not()
    .isEmpty(),
  check("stocks.*.price", "You must enter the price of the stock")
    .not()
    .isEmpty(),
];

export const updateStockValidator = [
  check("name", "You must enter the name of the stock").not().isEmpty(),
  check("quantity", "You must enter the quantity of the stock").not().isEmpty(),
  check("price", "You must enter the price of the stock").not().isEmpty(),
];

export const stockDispatchValidator = [
  check("stocks.*.stockId", "You must enter the name of the stock")
    .not()
    .isEmpty(),
  check("stocks.*.quantity", "You must enter the quantity of the stock")
    .not()
    .isEmpty(),
  check("stocks.*.department", "You must select the department")
    .not()
    .isEmpty(),
];
