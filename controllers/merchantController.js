const User = require("../models/user");
const Order = require("../models/order");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


exports.viewAllOrders = async (req, res, next) => {
    try {
      const orders = await Order.find()
        .populate("items")
        .sort({ orderDate: -1 }); // Sort by orderDate in descending order
  
      res.status(200).json(orders);
    } catch (err) {
      console.error("Error:", err);
      err.statusCode = err.statusCode || 500;
      next(err);
    }
  };

  exports.completeOrder = async (req, res, next) => {
    const orderId = req.params.id;
  
    try {
      const order = await Order.updateOne(
        { orderID: orderId },
        { orderStatus: "complete" }
      );
  
      if (order.nModified === 0) {
        const err = new Error("Order not found");
        err.statusCode = 404;
        throw err;
      }
  
      res.status(200).json({ message: "Order completed successfully" });
    } catch (err) {
      console.error("Error:", err);
      err.statusCode = err.statusCode || 500;
      next(err);
    }
  };
    exports.completeOrder = async (req, res, next) => {
    const orderId = req.params.id;
  
    try {
      const order = await Order.findOneAndUpdate(
        { orderID: orderId },
        { orderStatus: "complete" },
        { new: true }
      );
  
      if (!order) {
        const err = new Error("Order not found");
        err.statusCode = 404;
        throw err;
      }
  
      res.status(200).json(order);
    } catch (err) {
      console.error("Error:", err);
      err.statusCode = err.statusCode || 500;
      next(err);
    }
  };


  exports.getWaitingOrders = async (req, res, next) => {
    try {
      const orders = await Order.find({ orderStatus: "waiting" }).populate("items");
  
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