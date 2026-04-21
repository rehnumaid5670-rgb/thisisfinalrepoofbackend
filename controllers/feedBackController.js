const Feedback = require("../models/feedBack");

// GET all feedbacks
const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching feedback" });
  }
};

module.exports = {
  getFeedbacks
};