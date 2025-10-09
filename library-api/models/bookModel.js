const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: String,
  publishedYear: Number,
  ISBN: String,
  language: String,
  summary: String
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);
