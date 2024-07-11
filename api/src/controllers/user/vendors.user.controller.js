const createHttpError = require("http-errors");
const { Vendor, Booking } = require("../../models");

const ViewProfile = async (req, res, next) => {
  try {
    const vendor_id = req.params.vendor_id;
    console.log(`vendor_id`, vendor_id);
    const vendor = await Vendor.findOne({ _id: vendor_id })
      .populate("services")
      .populate("reviews")
      .exec();

    if (!vendor)
      return next(createHttpError(500, "Error retrieving vendor from Db"));

    return res.status(200).json({
      message: "Vendor Fetched Successfully",
      data: vendor,
    });
  } catch (error) {
    return next(createHttpError(500, "Error Fetching Profile:" + error));
  }
};

const CheckAvailability = async (req, res, next) => {
  try {
    //date="2024-07-10T00:00:00.000Z"
    if (!req.body.date) {
      return next(createHttpError(400, "Invalid Parameters "));
    }
    const vendor_id = req.params.vendor_id;
    const queryDate = new Date(req.body.date);
    let nextDate = new Date(queryDate.getTime() + 24 * 60 * 60 * 1000);
    // console.log(`QueryDate`, queryDate);

    const vendor = await Vendor.findById(vendor_id)
      .populate("services")
      .populate("reviews")
      .exec();

    if (!vendor)
      return next(createHttpError(500, "Error retrieving vendor from Db"));

    const bookings = await Booking.find({
      bookingDate: {
        $gte: queryDate,
        $lt: nextDate,
      },
    })
      .populate({
        path: "services",
        model: "Service",
      })
      .exec();
    // console.log(`Booking`, bookings);
    // console.log("Services Array", bookings[0].services);
    if (!bookings)
      return next(createHttpError(500, "Error retrieving bookings"));

    if (bookings.length == 0)
      return res.status(200).json({
        success: true,
        message: "Vendor is available at the given date",
      });

    //Checking if vendor is occupied in any of the bookings on the given date
    let vendorBookings = [];
    for (const booking of bookings) {
      for (const service of booking.services) {
        if (service.vendor.toString() === vendor_id) {
          vendorBookings.push(booking);
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: "Vendor not available on the given date",
      data: vendorBookings,
    });
  } catch (error) {
    return next(createHttpError(500, "Error Checking Availibility" + error));
  }
};

module.exports = {
  CheckAvailability,
  ViewProfile,
};
