import validator from "express-validator";
const { check } = validator;

export const CreateStaffValidator = [
  check("username", "This username must me 5+ characters long")
    .exists()
    .isLength({ min: 5 }),
  check("phone", "Phone Number is not valid").exists().isNumeric(),
  check("role", "Role is required").exists(),
  check("surname", "Surname is required").exists(),
  check("firstName", "First Name is required").exists(),
  check("address", "Address is required").exists(),
];
