const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    vendors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
      },
    ],
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
      enum: ["booked", "available"],
      default: "available",
      required: true,
    },
    ratings: {
      type: Number,
      required: false,
      default: 0.0,
    },
    serviceType: {
      type: String,
      enum: ["catering", "photography", "florist", "band"],
      required: true,
    },
    previousWork: [{ type: String }],
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", ServiceSchema);

module.exports = Service;
