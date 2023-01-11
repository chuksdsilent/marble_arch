import mongoose from "mongoose";

const StocksSchema = new mongoose.Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    trx_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
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

export default mongoose.model("Stocks", StocksSchema);
