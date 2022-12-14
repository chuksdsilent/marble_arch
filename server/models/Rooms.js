import mongoose from "mongoose";

const RoomsSchema = new mongoose.Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roomType: {
      type: String,
      required: true,
    },
    roomNumber: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: String,
      required: true,
    },
    booked: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Rooms", RoomsSchema);
