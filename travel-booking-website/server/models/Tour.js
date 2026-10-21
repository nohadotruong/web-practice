import mongoose from "mongoose";

const TourSchema = new mongoose.Schema({
  name: {
    vi: { type: String, required: true },
    en: { type: String, required: true },
  },
  price: { type: Number, required: true },
  start_date: { type: String, required: true },
  end_date: { type: String, required: true },
  duration: { type: Number, required: true },
  location: {
    vi: { type: String, required: true },
    en: { type: String, required: true },
  },
  description: {
    vi: { type: String, required: true },
    en: { type: String, required: true },
  },
  thumbnail: { type: String, required: true },
});

export default mongoose.models.Tour ||
  mongoose.model("Tour", TourSchema, "tours");
