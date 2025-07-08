const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  cuisine: String
});

module.exports = mongoose.model('Recipe', RecipeSchema);
