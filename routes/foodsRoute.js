const express = require("express");
const router = express.Router();
//const userAuth = require("../middlewares/adminAuth");
const AppError = require("../controllers/errorController");
const foodController = require("../controllers/foodController");

router.get("/vegan", foodController.getVeganFoods);
router.get("/allergenfree", foodController.getAllergenFreeFoods);

router.get("/:category", foodController.getFoodsByCategory);

router.get("/", foodController.getAvailableFoods);

router.use(AppError.onInvalidEndpoint);

module.exports = router;
