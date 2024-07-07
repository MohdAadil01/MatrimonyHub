const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema(
  {
    business_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
    portfolio: {
      type: [String],
    },
    availability: {
      type: String,
      enum: ["available", "booked"],
      default: "available",
    },
    ratings: {
      type: Number,
      required: false,
      default: 0.0,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    earnings: {
      type: Number,
      default: 0.0,
    },
  },
  { timestamps: true }
);

const Vendor = mongoose.model("Vendor", VendorSchema);

module.exports = Vendor;
