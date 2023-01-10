import mongoose from "mongoose";

const GuestInformationSchema = new mongoose.Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
    },
    categoryTypes: {
      type: String,
    },
    surname: {
      type: String,
    },
    firstName: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    occupation: {
      type: String,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("guestInformation", GuestInformationSchema);
