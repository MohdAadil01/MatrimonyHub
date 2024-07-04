const mongoose = require("mongoose");
const User = require("./User.model");
const Service = require("./Service.model");

const VendorSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    website: {
      type: String,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
    rating: {
      type: String,
    },
  },
  { timestamps: true }
);

const Vendor = mongoose.model("Vendor", VendorSchema);

module.exports = Vendor;
