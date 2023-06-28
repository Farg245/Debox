const AppError = require('./errorController');
const Food = require('../models/food');
const CurrencyConverter = require('../util/currencyConverter');

exports.getAvailableFoods = async (req, res, next) => {
  const currency = req.query.currency || 'EUR'; // Default currency is EUR

  try {
    const foods = await Food.find();
    await CurrencyConverter.convertAndSendResponse(foods, currency, res);
  } catch (err) {
    next(err);
  }
};

exports.getVeganFoods = async (req, res, next) => {
  const currency = req.query.currency || 'EUR'; // Default currency is EUR

  try {
    const foods = await Food.find({ is_vegan: true });
    await CurrencyConverter.convertAndSendResponse(foods, currency, res);
  } catch (err) {
    next(err);
  }
};

exports.getAllergenFreeFoods = async (req, res, next) => {
  const currency = req.query.currency || 'EUR'; // Default currency is EUR

  try {
    const foods = await Food.find({ has_allergens: false });
    await CurrencyConverter.convertAndSendResponse(foods, currency, res);
  } catch (err) {
    next(err);
  }
};

exports.getFoodsByCategory = async (req, res, next) => {
  const category = req.params.category;
  const currency = req.query.currency || 'EUR'; // Default currency is EUR

  try {
    const foods = await Food.find({ category });
    await CurrencyConverter.convertAndSendResponse(foods, currency, res);
  } catch (err) {
    next(err);
  }
};
