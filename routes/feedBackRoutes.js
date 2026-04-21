const express = require("express");
const router = express.Router();
const feedback = require("../models/feedBack");

// GET all feedback
router.get("/", async (req, res) => {
  const data = await feedback.find().sort({ createdAt: -1 });
  res.json(data);
});

// ✅ ADD THIS (POST)
router.post("/", async (req, res) => {
  try {
    const { name, message } = req.body;

    const newFeedback = new feedback({ name, message });
    await newFeedback.save();

    res.json({ msg: "Feedback saved" });

  } catch (err) {
    res.status(500).json({ msg: "Error saving feedback" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  await feedback.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;