const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const { Vendor, Service, Booking } = require("../../models");

const update = async (req, res, next) => {
  const { user: uid } = req;
  const { bid } = req.params;
  const { paymentStatus } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(uid) ||
    !mongoose.Types.ObjectId.isValid(bid)
  ) {
    return next(createHttpError(400, "Invalid ID."));
  }

  if (
    paymentStatus &&
    !["pending", "paid", "cancelled"].includes(paymentStatus)
  ) {
    return next(createHttpError(400, "Invalid payment status."));
  }

  let booking;

  try {
    booking = await Booking.findById(bid)
      .populate("userId")
      .populate("services");

    if (!booking) {
      return next(
        createHttpError(404, "Booking does not exist with the given id.")
      );
    }

    if (paymentStatus) {
      booking.paymentStatus = paymentStatus;
      if (paymentStatus === "paid") {
        booking.status = "confirmed";
      } else if (paymentStatus === "cancelled") {
        booking.status = "cancelled";
      } else if (paymentStatus === "pending") {
        booking.status = "pending";
      }
    }

    await booking.save();
    res.status(200).json({ message: "Booking updated successfully.", booking });
  } catch (error) {
    return next(
      createHttpError(500, "Error while updating booking. " + error.message)
    );
  }
};

module.exports = {
  update,
};
