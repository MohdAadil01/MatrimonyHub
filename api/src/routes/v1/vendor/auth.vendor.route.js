const express = require("express");
const router = express.Router();

const { vendorController } = require("../../../controllers");

router.get("/dummy", vendorController.vendorAuthController.dummy);
router.post("/login", vendorController.vendorAuthController.login);
router.post("/register", vendorController.vendorAuthController.register);

module.exports = router;
