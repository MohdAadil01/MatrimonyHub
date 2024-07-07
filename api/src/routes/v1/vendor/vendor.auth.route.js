const express = require("express");
const router = express.Router();

const { vendorController } = require("../../../controllers");

router.get("/dummy", vendorController.vendorAuthController.dummy);

module.exports = router;
