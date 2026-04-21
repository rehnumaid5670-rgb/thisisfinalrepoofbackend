const express = require("express");
const router = express.Router();
const Media = require("../models/ebook");

// 📥 GET all media
router.get("/", async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 📥 GET ebooks only
router.get("/ebooks", async (req, res) => {
  const ebooks = await Media.find({ type: "ebook" });
  res.json(ebooks);
});

// 📥 GET audiobooks only
router.get("/audiobooks", async (req, res) => {
  const audiobooks = await Media.find({ type: "audiobook" });
  res.json(audiobooks);
});

// ➕ ADD media
router.post("/", async (req, res) => {
  try {
    const media = new Media(req.body);
    await media.save();
    res.json(media);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ❌ DELETE media
router.delete("/:id", async (req, res) => {
  try {
    await Media.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;