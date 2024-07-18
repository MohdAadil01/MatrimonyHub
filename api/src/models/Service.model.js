const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    availability: {
      type: String,
      enum: ["booked", "available", "unavailable"],
      default: "available",
      required: true,
    },
    ratings: {
      type: Number,
      default: 0.0,
    },
    serviceType: {
      type: String,
      enum: ["catering", "photography", "florist", "band"],
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", ServiceSchema);

module.exports = Service;
