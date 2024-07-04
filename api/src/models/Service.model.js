const mongoose = require("mongoose");
const Vendor = require("./Vendor.model");

const ServiceSchema = new mongoose.Schema(
  {
    vendor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venodr",
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
      enum: ["booked", "available"],
      default: "available",
      required: true,
    },
    serviceType: {
      type: String,
      enum: ["catering", "photography", "florist"],
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", ServiceSchema);

module.exports = Service;
