const mongoose = require("mongoose");

const IngredientsSchema = new mongoose.Schema({
  id: { type: String },
  tname: { type: String },
  price: { type: Number },
  image: { type: String },
});

module.exports = mongoose.model("Ingredients", IngredientsSchema, "ingredients");
