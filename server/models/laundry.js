import mongoose from "mongoose";

const LaundrySchema = new mongoose.Schema(
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

export default mongoose.model("Laundry", LaundrySchema);
