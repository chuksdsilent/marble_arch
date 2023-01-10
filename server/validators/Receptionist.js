import validator from "express-validator";
const { check } = validator;

export const bookingValidator = [
  // check("phone", "Phone Number is not valid. Phone Number must be 11")
  //   .exists()
  //   .isNumeric(),
  check("address", "Address is required").exists(),
  check("arrivalDate", "Arrival Date is required").exists(),
  check("departureDate", "Departure Date is required").exists(),
  check("room", "Room Number is required").exists(),
  check("paymentMethod", "Payment Method to is required").exists(),
];

export const bookingWithOldGuestValidator = [
  check("arrivalDate", "Arrival Date is required").exists(),
  check("departureDate", "Departure Date is required").exists(),
  check("room", "Room Number is required").exists(),
  check("paymentMethod", "Payment Method to is required").exists(),
];

export const roomValidator = [
  check("roomType", "Room Type is required").exists(),
  check("roomNumber", "Room Number is required").exists(),
  check("price", "Phone Number is not valid. Phone Number must be 11")
    .exists()
    .isNumeric(),
];

export const updateGuestValidator = [
  check("surname", "Surname is required").exists(),
  check("firstName", "First Name is required").exists(),
  check("phone", "Phone Number is not valid. Phone Number must be 11")
    .exists()
    .isNumeric()
    .isLength({ min: 11, max: 11 }),
  check("gender", "Gender is required").exists(),
  check("address", "Address is required").exists(),
  check("nationality", "Nationality is required").exists(),
  check("occupation", "Occupation is required").exists(),
];
export const transferGuestValidator = [
  check("roomNumber", "Room Number is required").exists(),
  check("arrivalDate", "Arrival Date is required").exists(),
  check("departureDate", "Departure Date is required").exists(),
  check("transferredTo", "Room Transferred To is required").exists(),
  check("paymentMethod", "Payment Method To is required").exists(),
];
export const checkOutGuestValidator = [
  check("roomNumber", "Room Number is required").exists(),
];
export const searchForGuestValidator = [
  check("phone", "Phone Number is required and must be 11 digit")
    .exists()
    .isNumeric()
    .isLength({ min: 11, max: 11 }),
];
