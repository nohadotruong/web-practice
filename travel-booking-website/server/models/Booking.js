import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tour_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
    required: true,
  },
  date: { type: String, required: true },
  num_persons: { type: Number, required: true },
  payment_method: { type: String, required: true },
  payment_status: { type: String, required: true },
});

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema, "bookings");
