const express = require("express");
const router = express.Router();

// Import controller functions
const usingController = require("../controllers/usingController");

// Import auth middleware
const {verifyToken} = require("../middleware/auth");
 // make sure this path is correct

// Routes
router.get("/user", verifyToken, usingController.getLibraryUser);
router.post("/issue", verifyToken, usingController.issueBook);
router.post("/return", verifyToken, usingController.returnBook);

module.exports = router;