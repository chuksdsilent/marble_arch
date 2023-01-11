import mongoose from "mongoose";

const ExpensesSchema = new mongoose.Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    description: {
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

export default mongoose.model("Expenses", ExpensesSchema);
