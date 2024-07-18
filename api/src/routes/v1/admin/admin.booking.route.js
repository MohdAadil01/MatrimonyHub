const express = require("express");
const { adminController } = require("../../../controllers");
const { verifyJwtToken } = require("../../../middlewares/auth.middleware");

const router = express.Router();

router.get("/dummy", adminController.adminBookingController.dummy);
router.get("/viewbookings", verifyJwtToken, adminController.adminBookingController.viewBookings);
router.put("/:bookingId/updatestatus", verifyJwtToken, adminController.adminBookingController.updateBookingStatus);
router.delete("/:bookingId/deletebooking", verifyJwtToken, adminController.adminBookingController.deleteBooking);

module.exports= router;