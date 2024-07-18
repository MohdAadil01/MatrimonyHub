const express = require("express");
const { userController } = require("../../../controllers");
const { verifyJwtToken } = require("../../../middlewares/auth.middleware");

const router = express.Router();

// router.get("/login", userController.userAuthController.login);
router.post(
  "/",
  verifyJwtToken,
  userController.userBookingController.AddBookings
);
router.delete(
  "/:booking_id",
  verifyJwtToken,
  userController.userBookingController.DeleteBookings
);

router.get("/", userController.userBookingController.GetBookings);

module.exports = router;
