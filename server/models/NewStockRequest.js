import mongoose from "mongoose";

const NewStockRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    created: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("NewStockRequest", NewStockRequestSchema);
