const express = require("express");
const { vendorController } = require("../../../controllers");
const { authMiddleware, upload } = require("../../../middlewares");
const router = express.Router();

router.get(
  "/view",
  authMiddleware.verifyJwtToken,
  vendorController.vendorPortfolioController.view
);
router.put(
  "/add",
  authMiddleware.verifyJwtToken,
  upload.array("files"),
  vendorController.vendorPortfolioController.add
);
router.put(
  "/update/:pid",
  authMiddleware.verifyJwtToken,
  upload.array("files"),
  vendorController.vendorPortfolioController.update
);
router.delete(
  "/delete/:pid",
  authMiddleware.verifyJwtToken,
  vendorController.vendorPortfolioController.deleteOne
);
router.delete(
  "/deleteAll",
  authMiddleware.verifyJwtToken,
  vendorController.vendorPortfolioController.deleteAll
);

module.exports = router;
