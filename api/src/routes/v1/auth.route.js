const express = require("express");
const { authController } = require("../../controllers");

const router = express.Router();

router.get("/dummy", authController.dummy);

module.exports = router;
