const createHttpError = require("http-errors");
const mongoose = require("mongoose");
const { Payment, Booking } = require("../../models");

const AddPayment = async (req, res, next) => {
  try {
    if (
      !req.body.bookingId ||
      !req.body.amount ||
      !req.body.currency ||
      !req.body.paymentMethod ||
      !req.body.paymentStatus ||
      !req.body.transactionDate ||
      !req.body.transactionId ||
      !req.body.billingAddress ||
      !req.body.paymentNote
    )
      return next(createHttpError(400, "Missing parameters"));
    const userId = req.user;

    const booking = await Booking.findById(req.body.bookingId);
    if (!booking) return next(createHttpError(400, "Invalid bookingId"));

    const transactionDate = new Date(req.body.transactionDate);
    if (isNaN(transactionDate))
      return next(createHttpError(400, "Invalid Date Format"));

    const NewPayment = new Payment({
      userId: userId,
      bookingId: req.body.bookingId,
      amount: req.body.amount,
      currency: req.body.currency,
      paymentMethod: req.body.paymentMethod,
      paymentStatus: req.body.paymentStatus,
      transactionDate: transactionDate,
      transactionId: req.body.transactionId,
      billingAddress: req.body.billingAddress,
      paymentNote: req.body.paymentNote,
    });

    await NewPayment.save();

    return res.status(200).json({
      success: true,
      message: "Payment Added Successfully",
      data: NewPayment,
    });
  } catch (error) {
    return next(createHttpError(500, "Error adding payments: " + error));
  }
};

module.exports = { AddPayment };
