const express = require("express");
const { adminController } = require("../../../controllers");
const { verifyJwtToken } = require("../../../middlewares/auth.middleware");

const router = express.Router();


router.get("/getusers", verifyJwtToken, adminController.adminUserController.fetchAllUsers);

module.exports = router;