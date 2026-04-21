const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: String,
  message: String
}, { timestamps: true });

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;