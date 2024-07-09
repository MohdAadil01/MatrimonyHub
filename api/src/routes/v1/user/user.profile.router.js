const express = require("express");
const { userController } = require("../../../controllers");
const { verifyJwtToken } = require("../../../middlewares/auth.middleware");

const router = express.Router();

// router.get("/login", userController.userAuthController.login);
router.get(
  "/profile",
  verifyJwtToken,
  userController.userProfileController.ViewProfile
);
router.put(
  "/profile",
  verifyJwtToken,
  userController.userProfileController.UpdateProfile
);

module.exports = router;
