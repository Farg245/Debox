const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },

  cart: [
    {
      food: { type: Schema.Types.ObjectId, ref: "Food", required: true },
      qty: { type: Number, required: true },
    },
  ],
  order: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

userSchema.methods.addToCart = function (foodItem) {
  const existingFoodIndex = this.cart.findIndex((cartFood) =>
    cartFood.food._id.equals(foodItem._id)
  );

  if (existingFoodIndex >= 0) {
    // Increment the quantity of the existing food item
    this.cart[existingFoodIndex].qty += 1;
  } else {
    // Add a new food item to the cart
    this.cart.push({
      food: foodItem,
      qty: 1,
    });
  }

  return this.save();
};

userSchema.methods.editCart = function (foodItem, newQty) {
  if (newQty < 1) {
    // Remove the food item from the cart if the new quantity is less than 1
    this.cart = this.cart.filter((cartFood) =>
      cartFood.food._id.equals(foodItem._id)
    );
  } else {
    const existingFoodIndex = this.cart.findIndex((cartFood) =>
      cartFood.food._id.equals(foodItem._id)
    );

    if (existingFoodIndex >= 0) {
      // Update the quantity of the existing food item
      this.cart[existingFoodIndex].qty = newQty;
    } else {
      // Food item not found in the cart
      return Promise.reject();
    }
  }

  return this.save();
};

module.exports = mongoose.model("User", userSchema);
