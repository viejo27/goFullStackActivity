const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  difficulty: { type: Number, required: true },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
  time: { type: Number, required: true },
  title: { type: String, required: true },
});

module.exports = mongoose.model('Recipe', recipeSchema);
