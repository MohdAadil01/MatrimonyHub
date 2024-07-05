const express = require("express");
const { authController } = require("../../controllers");

const router = express.Router();

router.get("/dummy", authController.dummy);
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authController.logout);

module.exports = router;
