const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
  content: String,
  author: String,
  category: String,
});

module.exports = mongoose.model('Quote', QuoteSchema);
