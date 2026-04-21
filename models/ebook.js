const mongoose = require("mongoose");

const ebookRoutes = new mongoose.Schema({
  title: String,
  author: String,

  type: {
    type: String,
    enum: ["ebook", "audiobook"],
    required: true
  },

  status: {
    type: String,
    default: "available"
  },

  downloadUrl: String, // for ebook
  audioUrl: String     // for audiobook

}, { timestamps: true });

module.exports = mongoose.model("ebookRoutes", ebookRoutes);