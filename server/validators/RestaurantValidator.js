import validator from "express-validator";
const { check } = validator;

export const addMenuRequestValidator = [
  check("menus.*.menuId", "You must select the name of the Menu")
    .not()
    .isEmpty(),
  check("menus.*.qty", "You must select the price of the Menu").not().isEmpty(),
];
