const mongoose = require("mongoose");

const issuedBookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String },
  dueDate: { type: Date, required: true },
});

const libraryCardSchema = new mongoose.Schema({
  cardId: { type: String, required: true },
  type: { type: String, default: "Student" },
  issueDate: { type: Date, default: Date.now },
  expiryDate: { type: Date },
  status: { type: String, default: "Active" },
  fine: { type: Number, default: 0 },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  card: { type: libraryCardSchema, default: {} },
  books: [issuedBookSchema],
  favorites: [{ title: String, author: String, key: String, cover_i: Number }],
});

module.exports = mongoose.model("User", userSchema);