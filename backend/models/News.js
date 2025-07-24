const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: Date, default: Date.now },
  author: { type: String, default: 'Anónimo' },
});

module.exports = mongoose.model('News', NewsSchema); 