const User = require("../models/user");
const Order = require("../models/order");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


exports.viewAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("items");

    res.status(200).json(orders);
  } catch (err) {
    console.error("Error:", err);
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};

// exports.viewAllOrders = async (req, res, next) => {
//     try {
//       // Retrieve all orders
//       const orders = await Order.find();
  
//       res.status(200).json({ orders });
//     } catch (err) {
//       console.error("Error:", err);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   };