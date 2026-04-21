const Book = require("../models/Books");

const getBook = async (req, res, next) => {
  try {
    const book = await Book.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: book.length,
      data: book
    });
  } catch (error) {
    next(error);
  }
};


const addBook = async (req, res, next) => {
  try {

    const { title, author, category, description, image, quantity } = req.body;

    // check required fields
    if (!title || !author || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, Author and Category are required"
      });
    }

    // check if book already exists
    const existingBook = await Book.findOne({ title });

    if (existingBook) {
      return res.status(400).json({
        success: false,
        message: "Book already exists"
      });
    }

    // create new book
    const newBook = await Book.create({
      title,
      author,
      category,
      description,
      image,
      quantity
    });

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: newBook
    });

  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ success: true, book: updatedBook });
  } catch (err) {
    res.status(500).json({ message: "Error updating book" });
  }
};

module.exports = {
  getBook,
  addBook,
  deleteBook,
  updateBook,
};
