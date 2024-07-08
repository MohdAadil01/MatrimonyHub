const express = require("express");
const router = express.Router();
const { upload } = require("../../../middlewares");

const { vendorController } = require("../../../controllers");

router.get("/dummy", vendorController.vendorAuthController.dummy);
router.post("/login", vendorController.vendorAuthController.login);
router.post(
  "/register",
  upload.array("files"),
  vendorController.vendorAuthController.register
);
router.post("/logout", vendorController.vendorAuthController.logout);

module.exports = router;
