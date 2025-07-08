const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  description: {
    type: String,       
    required: false,   
  }
});

module.exports = mongoose.model('Recipe', RecipeSchema);
