const express = require("express");
const router = express.Router();

const {
  getBook,
  addBook,
  deleteBook,
  updateBook,
} = require("../controllers/BookController");

const { verifyToken } = require("../middleware/auth"); 

router.get("/", getBook);
router.post("/", verifyToken, addBook);
router.delete("/:id", verifyToken, deleteBook);
router.put("/:id", verifyToken, updateBook);

module.exports = router;

