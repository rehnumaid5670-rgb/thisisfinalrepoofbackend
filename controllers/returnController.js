// const Book = require("../models/Books");

// // Return a book (increase quantity)
// const returnBook = async (req, res) => {
//   try {
//     const { bookId } = req.body;

//     if (!bookId) {
//       return res.status(400).json({ success: false, message: "Book ID is required" });
//     }

//     // Find the book by ID
//     const book = await Book.findById(bookId);
//     if (!book) {
//       return res.status(404).json({ success: false, message: "Book not found" });
//     }

//     // Increase quantity
//     book.quantity += 1;
//     await book.save();

//     res.json({ success: true, message: "Book returned successfully", book });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Error returning book" });
//   }
// };

// module.exports = { returnBook };