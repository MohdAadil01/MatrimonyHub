const express = require("express");
const router = express.Router();

const { vendorController } = require("../../../controllers");
const { authMiddleware } = require("../../../middlewares");

router.get(
  "/view",
  authMiddleware.verifyJwtToken,
  vendorController.vendorProfileController.view
);
router.put(
  "/update",
  authMiddleware.verifyJwtToken,
  vendorController.vendorProfileController.update
);
router.delete(
  "/remove",
  authMiddleware.verifyJwtToken,
  vendorController.vendorProfileController.remove
);
module.exports = router;
