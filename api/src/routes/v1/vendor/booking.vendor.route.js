const express = require("express");
const { vendorController } = require("../../../controllers");
const { authMiddleware } = require("../../../middlewares");
const router = express();

router.patch(
  "/:bid",
  authMiddleware.verifyJwtToken,
  vendorController.vendorBookingController.update
);

module.exports = router;
