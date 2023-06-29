const express = require("express");
const router = express.Router();
const merchantController = require("../controllers/merchantController");
const { body } = require("express-validator");
const Admin = require("../models/admin");
const adminAuth = require("../middlewares/adminAuth");


// Route for viewing all orders (no admin authorization required yet )
router.get("/viewall",adminAuth, merchantController.viewAllOrders);

module.exports = router;