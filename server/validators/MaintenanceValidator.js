import validator from "express-validator";
const { check } = validator;

export const CreateMaintenanceItemValidator = [
  check("items.*.stockId", "You must enter the name of the item")
    .not()
    .isEmpty(),
  check("items.*.quantity", "You must enter the quantity of the item")
    .not()
    .isEmpty(),
];

export const CreateFaultValidator = [
  check("title", "Title is required.").not().isEmpty(),
  check("description", "Description is required.").not().isEmpty(),
];
