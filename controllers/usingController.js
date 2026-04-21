const User = require("../models/User");

/**
 * @desc Get library info for logged-in user
 * @route GET /api/library/user
 * @access Private
 */
const getLibraryUser = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      card: user.card,
      books: user.books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc Issue a new book to user
 * @route POST /api/library/issue
 * @access Private
 */
const issueBook = async (req, res) => {
  try {
    const { title, author, dueDate } = req.body;
    const user = await User.findById(req.user.id);

    if (user.books.length >= 5) {
      return res.status(400).json({ message: "Book limit reached" });
    }

    user.books.push({ title, author, dueDate });
    await user.save();

    res.status(200).json({ message: "Book issued successfully", books: user.books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc Return a book
 * @route POST /api/library/return
 * @access Private
 */
const returnBook = async (req, res) => {
  try {
    const { title } = req.body;
    const user = await User.findById(req.user.id);

    user.books = user.books.filter((book) => book.title !== title);
    await user.save();

    res.status(200).json({ message: "Book returned", books: user.books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getLibraryUser,
  issueBook,
  returnBook,
};