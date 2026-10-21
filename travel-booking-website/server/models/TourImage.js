const mongoose = require("mongoose");

const TourImageSchema = new mongoose.Schema({
  tour_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
    required: true,
  },
  url: { type: String, required: true },
});

module.exports = mongoose.model(
  "TourImage",
  TourImageSchema
);
