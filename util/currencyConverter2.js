const axios = require('axios');

// Helper function to fetch exchange rate from fixer.io API
async function getExchangeRate(currency) {
  try {
    const response = await axios.get(
      `http://data.fixer.io/api/latest?access_key=7437b2ee5a5094d7c73da2a109f3f267&base=EUR&symbols=${currency}`
    );

    const exchangeRate = response.data.rates[currency];
    return exchangeRate;
  } catch (error) {
    throw new Error('Failed to fetch exchange rate');
  }
}

// Helper function to convert prices to the requested currency and send the response
const convertAndSendResponse = async (foods, currency, res) => {
  const exchangeRate = await getExchangeRate(currency);
  if (!exchangeRate) {
    throw new Error('Invalid currency');
  }

  const convertedFoods = convertPrices(foods, exchangeRate);

  res.status(200).json(convertedFoods);
};

// Helper function to convert prices to the requested currency
function convertPrices(foods, exchangeRate, currency) {
    const convertedFoods = foods.map((food) => ({
      ...food._doc,
      price: parseFloat((food.price_eur * exchangeRate).toFixed(2)),
      currency: currency,
      updatedPrice: parseFloat((food.price_eur * exchangeRate).toFixed(2)),
    }));
  
    return convertedFoods;
  }
module.exports = {
  getExchangeRate,
  convertAndSendResponse,
};
