import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    surname: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    passwordChanged: {
      type: Boolean,
      required: true,
      default: false,
    },
    suspended: {
      type: Boolean,
      required: true,
      default: false,
    },
    role: {
      type: String,
      enum: [
        "receptionist",
        "store-keeper",
        "bar",
        "kitchen",
        "laundry",
        "restaurant",
        "maintenance",
        "manager",
      ],
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
