import validator from "express-validator";
const { check } = validator;

export const CreateExpensesValidator = [
  check("title", "Title is required").exists(),
  check("amount", "Amount is required").exists(),
  check("description", "Description is required").exists(),
  check("department", "Department is required").exists(),
];

export const menuValidator = [
  check("name", "You must enter the name of the stock").not().isEmpty(),
  check("price", "You must enter the price of the stock").not().isEmpty(),
];
