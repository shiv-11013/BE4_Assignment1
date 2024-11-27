const mongoose = require("mongoose");
const { type } = require("os");
const { stringify } = require("querystring");

const newBooksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishedYear: {
    type: Number,
    required: true,
  },
  genre: {
    type: [String],
    enum: ["Non-fiction", "Business", "Autobiography"],
  },
  language: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  coverImageUrl: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model("Book", newBooksSchema);

module.exports = Book;
