const express = require("express");
const router = express.Router();
const merchantController = require("../controllers/merchantController");
const { body } = require("express-validator");
const Admin = require("../models/admin");
const adminAuth = require("../middlewares/adminAuth");



router.get("/viewall",adminAuth, merchantController.viewAllOrders);
router.get("/completedorder/:id",adminAuth, merchantController.completeOrder);
router.get("/pendingorders/",adminAuth, merchantController.getWaitingOrders);
module.exports = router;