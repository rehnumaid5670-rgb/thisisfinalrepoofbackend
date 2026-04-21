const mongoose = require("mongoose");

const catalogueSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  author: {
    type: String,
    required: true
  },

  category: {
    type: String,
    default: "General"
  },

  image: {
    type: String,
    default: ""
  },

  type: {
    type: String,
    enum: ["ebook", "audiobook"],
    required: true
  },

  downloadUrl: {
    type: String, // for ebooks
    default: ""
  },

  audioUrl: {
    type: String, // for audiobooks
    default: ""
  },

  status: {
    type: String,
    default: "available"
  }

}, { timestamps: true });

module.exports = mongoose.model("Catalogue", catalogueSchema);