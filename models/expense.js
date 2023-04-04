const mongoose = require("mongoose");

const expensesSchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expenses", expensesSchema);
