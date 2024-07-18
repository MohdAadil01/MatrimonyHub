const createHttpError = require("http-errors");

const { Booking } = require("../../models");

const dummy = (req, res) => {
  res.send("Working route on the above url");
};
/*const createBooking = async(req, res, next) => {
    try {
        const { userId, services, bookingDate, status, paymentStatus } = req.body;
    
        const newBooking = new Booking({
          userId,
          services,
          bookingDate,
          status,
          paymentStatus,
        });
    
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
}
*/

/************************View all bookings ***********************/

const viewBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    if (bookings.length === 0) {
      return res.status(404).json({ message: "No booking found." });
    }
    res.status(200).json(bookings);
  } catch (error) {
    return next(createHttpError(400, "Error in fetching bookings. " + error));
  }
};

/**************************update stattus of booking ************************/


const updateBookingStatus = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const { status, paymentStatus } = req.body;

    // Find the booking by ID and update the specified fields
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status, paymentStatus },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }

};

/**********************delete a booking ***********************/

const deleteBooking = async (req, res, next) => {

  try {
    const { bookingId } = req.params;

    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }

}

module.exports = {
    dummy,
    viewBookings,
    updateBookingStatus,
    deleteBooking
}