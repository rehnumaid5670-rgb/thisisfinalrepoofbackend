const Feedback = require("../models/feedBack");

// GET all feedbacks
const Feedback = async (req, res) => {
  try {
    const Feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json(Feedback);
  } catch (err) {
    res.status(500).json({ message: "Error fetching feedback" });
  }
};

module.exports = {
  Feedback
};