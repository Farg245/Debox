const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AppError = require("./errorController");
const { APP_KEY } = require("../config/AppConst");
const User = require("../models/user");
const Food = require("../models/food");
const Order = require("../models/order");
const OrderItem = require("../models/orderItem");
const { validationResult } = require("express-validator");
const currencyConverter = require('../util/currencyConverter2');


const handleValidationErrors = (req, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Validation Error");
    err.statusCode = 422;
    err.data = errors.array();
    throw err;
  }
};

exports.onSignup = async (req, res, next) => {
  try {
    handleValidationErrors(req, next);

    const { email, password, firstName, lastName, address, phone } = req.body;

    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // If the user already exists, return an error response
      const err = new Error("User with this email already exists.");
      err.statusCode = 409; // Conflict status code
      throw err;
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email,
      password: hashPassword,
      firstName,
      lastName,
      address,
      phone,
      cart: [],
      order: [],
    });

    const savedUser = await user.save();

    const token = jwt.sign(
      { userId: savedUser._id.toString(), email: savedUser.email },
      APP_KEY,
      { expiresIn: "90d" }
    );

    res.status(200).json(token);
  } catch (err) {
    console.error("Error:", err);
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};

exports.onLogin = async (req, res, next) => {
  handleValidationErrors(req, next);

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      const err = new Error("User Does not exist with the provided email ID");
      err.statusCode = 401;
      throw err;
    }

    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      const err = new Error("Password does not match!");
      err.statusCode = 401;
      throw err;
    }

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      APP_KEY,
      { expiresIn: "90d" }
    );

    res.status(200).json(token);
  } catch (err) {
    console.error("Error:", err);
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};

exports.getCart = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).populate("cart");

    res.status(200).json(user.cart);
  } catch (err) {
    console.error("Error:", err);
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const userId = req.userId;
    const foodId = req.params.id;

    console.log("Adding to cart");

    const currentUser = await User.findById(userId).populate("cart.food");
    const food = await Food.findById(foodId);

    const result = await currentUser.addToCart(food);

    res.status(200).json(result.cart);
  } catch (err) {
    console.error("Error:", err);
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};
  //editCart and generally cart/:id/:qty can generally crash the app if the request :id doesnt exist in the Cart/ take into account when using or developing website/front-end
exports.editCart = async (req, res, next) => {
  const userId = req.userId;
  const foodId = req.params.id;
  const qty = Number(req.params.qty);

  try {
    const currentUser = await User.findById(userId).populate("cart.food");
    const food = await Food.findById(foodId);

    if (!food) {
      const err = new Error("Food not found");
      err.statusCode = 404;
      throw err;
    }

    const result = await currentUser.editCart(food, qty);

    res.status(200).json(result.cart);
  } catch (err) {
    console.error("Error:", err);
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};

exports.getOrder = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).populate("order");

    res.status(200).json(user.order);
  } catch (err) {
    console.error("Error:", err);
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};

exports.getSelectedOrder = async (req, res, next) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId).populate("items");

    res.status(200).json(order);
  } catch (err) {
    console.error("Error:", err);
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};
exports.addOrder = async (req, res, next) => {
  const userId = req.userId;
  const orderId = `${Math.floor(Math.random() * 89999 + 1000)}`;

  try {
    const user = await User.findById(userId).populate("cart.food");

    if (user.cart.length === 0) {
      const error = new Error("Cart is empty");
      error.statusCode = 400;
      throw error;
    }

    let total = 0;
    let orderedItems = [];

    const currency = req.query.currency || "EUR";

    user.cart.forEach((item) => {
      const qty = item.qty;
      const price = item.food.price_eur; // Assuming the price is already in the desired currency
      total += qty * price;

      const orderItem = new OrderItem({
        food: item.food._id,
        foodName: item.food.item_name, // Add foodName property
        quantity: qty,
      });
      orderedItems.push(orderItem);
    });

    const roundedTotal = Number(total.toFixed(2));
    const order = new Order({
      orderID: orderId,
      items: orderedItems,
      totalAmount: roundedTotal,
      orderDate: new Date(),
      orderStatus: "waiting",
      currency: currency,
      user: {
        email: user.email,
        address: user.address
      }
    });

    const savedOrder = await order.save();
    user.order.push(savedOrder);
    user.cart = [];

    await user.save();

    res.status(200).json(savedOrder);
  } catch (err) {
    console.error("Error:", err);
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};

exports.viewProfile = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");

    res.status(200).json(user);
  } catch (err) {
    console.error("Error:", err);
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};