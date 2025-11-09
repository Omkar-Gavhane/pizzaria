const mongoose = require("mongoose");

const PizzaSchema = new mongoose.Schema({
  id: { type: String },
  type: { type: String, enum: ["veg", "nonveg"] },
  price: { type: Number },
  name: { type: String },
  image: { type: String },
  description: { type: String },
  ingredients: { type: [String] },
  topping: { type: [String] },
});

module.exports = mongoose.model("Pizza", PizzaSchema, "pizzas");
