import validator from "express-validator";
const { check } = validator;

export const CreateOrderValidator = [
  check("order.*.stockId", "You must enter the name of the item")
    .not()
    .isEmpty(),
  check("order.*.quantity", "You must enter the quantity of the item")
    .not()
    .isEmpty(),
];

export const CreateBarItemValidator = [
  check("items.*.name", "You must enter the name of the item").not().isEmpty(),
  check("items.*.price", "You must enter the price of the item")
    .not()
    .isEmpty(),
];
