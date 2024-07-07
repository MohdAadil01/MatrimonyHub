const express = require("express");
const { userController } = require("../../../controllers");

const router = express.Router();

router.post("/login", userController.userAuthController.login);
router.post("/register", userController.userAuthController.register);
router.post("/logout", userController.userAuthController.logout);

module.exports = router;
