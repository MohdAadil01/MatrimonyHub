const mongoose = require("mongoose");
const User = require("./User.model");
const Booking = require("./Booking.model");

const PaymentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
        type: String,
        required: true,
        default: "rupee", 
      },
    paymentMethod: {
      type: String,
      enum: ["card", "UPI", "bank_transfer", "cash"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
      required: true,
    },
    transactionDate: {
      type: Date,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    billingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String, required: true },
      },
    paymentNote: {
      type: String,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
