const mongoose = require("mongoose");



const productSchema =new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  item_name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  has_allergens: {
    type: Boolean,
    required: true
  },
  is_vegan: {
    type: Boolean,
    required: true
  },
  price_eur: {
    type: Number,
    required: true
  } 

});

module.exports = mongoose.model("Food", productSchema);
