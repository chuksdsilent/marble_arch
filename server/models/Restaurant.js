import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    menuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    trx_id: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    kitchen_received: {
      type: Boolean,
      required: false,
      default: false,
    },
    kitchen_sent: {
      type: Boolean,
      required: false,
      default: false,
    },
    res_received: {
      type: Boolean,
      required: false,
      default: false,
    },
    total: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Restaurant", RestaurantSchema);
