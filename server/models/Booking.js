import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    guestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "guestInformation",
      required: true,
    },
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rooms",
      required: true,
    },
    categoryType: {
      type: String,
    },
    arrivalDate: {
      type: Date,
      required: true,
    },
    departureDate: {
      type: Date,
      required: true,
    },
    roomNumber: {
      type: String,
      required: true,
    },
    transferredTo: {
      type: Number,
    },
    discount: {
      type: Number,
      default: 0,
    },
    booked: {
      type: Boolean,
      default: false,
    },
    transferred: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: true,
      default: 0.0,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    created: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);
