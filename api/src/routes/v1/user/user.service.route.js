const express = require("express");
const { userController } = require("../../../controllers");

const router = express.Router();

// router.get("/login", userController.userAuthController.login);
router.get("/", userController.userServiceController.BrowseServices);
router.post("/search", userController.userServiceController.SearchServices);

router.post("/filter", userController.userServiceController.QueryService);
router.get("/:id", userController.userServiceController.GetService);

module.exports = router;
