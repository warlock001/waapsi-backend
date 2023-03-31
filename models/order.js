const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
