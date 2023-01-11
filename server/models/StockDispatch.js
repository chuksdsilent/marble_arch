import mongoose from "mongoose";

const StockDispatchesSchema = new mongoose.Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stocks",
      required: true,
    },
    trx_id: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      enum: ["kitchen", "bar", "laundry", "maintenance"],
      required: true,
    },

    quantity: {
      type: String,
      required: true,
    },
    received: {
      type: String,
      required: true,
      default: false,
    },
    total: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    created: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("StockDispatches", StockDispatchesSchema);
