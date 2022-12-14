import mongoose from "mongoose";

const GuestInformationSchema = new mongoose.Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    surname: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    occupation: {
      type: String,
      required: true,
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
