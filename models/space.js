const mongoose = require("mongoose");

const spaceBookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
spaceName: { type: String, required: true }, 
  date: { type: Date, required: true },
  startTime: { type: String, required: true }, // e.g., "10:00"
  endTime: { type: String, required: true },   // e.g., "12:00"
  status: { type: String, enum: ["Booked", "Cancelled"], default: "Booked" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SpaceBooking", spaceBookingSchema);