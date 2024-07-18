const express = require("express");
const { userController } = require("../../../controllers");
const { verifyJwtToken } = require("../../../middlewares/auth.middleware");

const router = express.Router();

// router.get("/login", userController.userAuthController.login);
router.post(
  "/",
  verifyJwtToken,
  userController.userPaymentController.AddPayment
);

module.exports = router;
