// backned/routes/userRoutes.js
const express = require("express");
const { getUsers, deleteUser } = require("../controllers/UserController");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// GET all users
router.get("/", verifyToken, getUsers);

// DELETE user by ID (optional)
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;