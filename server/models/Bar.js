import mongoose from "mongoose";

const BarSchema = new mongoose.Schema(
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
    dispatchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StockDispatches",
      required: true,
    },
    trx_id: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
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

export default mongoose.model("Bar", BarSchema);
