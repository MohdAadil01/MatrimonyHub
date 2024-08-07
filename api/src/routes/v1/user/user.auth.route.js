const express = require("express");
const { upload } = require("../../../middlewares");
const { userController } = require("../../../controllers");

const router = express.Router();

router.post(
  "/dummy",
  //   upload.single("files"),
  upload.array("files"),
  userController.userAuthController.dummy
);
router.post("/login", userController.userAuthController.login);
router.post("/register", userController.userAuthController.register);
router.post("/logout", userController.userAuthController.logout);
router;

module.exports = router;
