const express = require("express");
const router = express.Router();
const Catalogue = require("../models/catalogue");


// ✅ GET all books
router.get("/", async (req, res) => {
  try {
    const books = await Catalogue.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ GET only ebooks
router.get("/ebooks", async (req, res) => {
  const books = await Catalogue.find({ type: "ebook" });
  res.json(books);
});


// ✅ GET only audiobooks
router.get("/audiobooks", async (req, res) => {
  const books = await Catalogue.find({ type: "audiobook" });
  res.json(books);
});


// ✅ ADD new book
router.post("/", async (req, res) => {
  try {
    const newBook = new Catalogue(req.body);
    await newBook.save();
    res.json(newBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ DELETE book
router.delete("/:id", async (req, res) => {
  try {
    await Catalogue.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ UPDATE book (optional but important)
router.put("/:id", async (req, res) => {
  try {
    const updated = await Catalogue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;