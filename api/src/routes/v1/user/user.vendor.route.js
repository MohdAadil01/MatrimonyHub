const express = require("express");
const { userController } = require("../../../controllers");

const router = express.Router();

// router.get("/login", userController.userAuthController.login);
router.get("/:vendor_id", userController.userVendorController.ViewProfile);
router.post(
  "/:vendor_id/availability",
  userController.userVendorController.CheckAvailability
);

module.exports = router;
