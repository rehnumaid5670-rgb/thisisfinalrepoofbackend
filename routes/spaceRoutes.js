const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middleware/auth");
const {
  bookSpace,
  getUserBookings,
  cancelBooking,
} = require("../controllers/spaceController");

// Use correct routes
router.post("/book-space", verifyToken, bookSpace);
router.get("/my-bookings", verifyToken, getUserBookings);
router.post("/cancel-booking", verifyToken, cancelBooking);

module.exports = router;