const express = require("express");
const { adminController } = require("../../../controllers");
const { verifyJwtToken } = require("../../../middlewares/auth.middleware");

const router = express.Router();

router.get("/dummy", adminController.adminAuthController.dummy);
router.post("/login", adminController.adminAuthController.loginAdmin);
router.post("/register", adminController.adminAuthController.registerAdmin);


module.exports = router;
