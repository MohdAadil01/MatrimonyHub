const createHttpError = require("http-errors");
const { User, Service, Booking } = require("../../models");

const AddBookings = async (req, res, next) => {
  try {
    if (!req.body.userId || !req.body.services || !req.body.bookingDate)
      return next(createHttpError(400, "Invalid Parameters"));

    const user = await User.findById(req.body.userId);
    if (!user) return next(createHttpError(400, "Invalid UserId"));

    await req.body.services.forEach(async (service) => {
      const result = await Service.findById(service);

      if (!result) return next(createHttpError(400, "Invalid ServiceId"));
    });

    const bookingDate = new Date(req.body.bookingDate);
    if (isNaN(bookingDate))
      return next(createHttpError(400, "Invalid Date Format"));

    if (bookingDate < new Date())
      return next(createHttpError(400, "Booking Date has elasped"));

    const newBooking = new Booking({
      userId: req.body.userId,
      services: req.body.services,
      bookingDate: req.body.bookingDate,
    });
    await newBooking.save();

    return res.status(200).json({
      success: true,
      message: "New Booking created successfully",
      data: newBooking,
    });
  } catch (error) {
    return next(createHttpError(400, "Error adding booking: " + error));
  }
};

const DeleteBookings = async (req, res, next) => {
  try {
    const BookingId = req.params.booking_id;

    const booking = await Booking.findByIdAndDelete(BookingId);
    return res.status(200).json({
      success: true,
      message: "Booking Deleted Successfully",
    });
  } catch (error) {
    return next(createHttpError(500, "Error deleting booking: " + error));
  }
};

const GetBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    if (!bookings)
      return next(createHttpError(500, "Error fetching bookings from DB"));

    return res.status(200).json({
      success: true,
      message: "Booking Fetched Successfully",
      data: bookings,
    });
  } catch (error) {
    return next(createHttpError(500, "Error deleting booking: " + error));
  }
};

const GetUserBookings = async (req, res, next) => {
  try {
    const userId = req.user;

    const bookings = await Booking.find({ userId });
    if (!bookings)
      return next(createHttpError(500, "Error fetching bookings from DB"));

    return res.status(200).json({
      success: true,
      message: "User Bookings Fetched Successfully",
      data: bookings,
    });
  } catch (error) {
    return next(createHttpError(500, "Error deleting booking: " + error));
  }
};

module.exports = { AddBookings, DeleteBookings, GetBookings, GetUserBookings };
