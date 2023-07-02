const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderID: {
    type: String,
    required: true,
  },
  items: [
    {
      food: {
        type: Schema.Types.ObjectId,
        ref: "Food",
        required: true,
      },
      foodName: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
  },
  orderStatus: {
    type: String,
  },
  currency: {
    type: String,
    default: "EUR",
  },
});

module.exports = mongoose.model("Order", orderSchema);
