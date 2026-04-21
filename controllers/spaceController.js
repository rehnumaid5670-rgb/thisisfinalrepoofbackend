const SpaceBooking = require("../models/space");

/**
 * @desc Book a space
 * @route POST /api/library/book-space
 * @access Private
 */

const bookSpace = async (req, res) => {
  try {
    console.log(req.body);
    const { spaceName, date, startTime, endTime } = req.body;

    // Check if already booked
    const existingBooking = await SpaceBooking.findOne({
      spaceName,
      date,
      startTime,
      endTime,
      
    });

    if (existingBooking) {
      return res.status(400).json({ message: "This space is already booked for the selected time." });
    }

    const booking = await SpaceBooking.create({
      user: req.user.id,
      spaceName,
      date,
      startTime,
      endTime,
    });

    res.status(201).json({ message: "Space booked successfully", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc Get all bookings of logged-in user
 * @route GET /api/library/my-bookings
 * @access Private
 */
const getUserBookings = async (req, res) => {
  try {
    const bookings = await SpaceBooking.find({ user: req.user.id }).sort({ date: 1 });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc Cancel a booking
 * @route POST /api/library/cancel-booking
 * @access Private
 */
const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await SpaceBooking.findById(bookingId);

    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.user.toString() !== req.user.id) return res.status(403).json({ message: "Unauthorized" });

    booking.status = "Cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  bookSpace,
  getUserBookings,
  cancelBooking,
};