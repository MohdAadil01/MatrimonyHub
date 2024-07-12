const express = require("express");

const { vendorController } = require("../../../controllers");
const { upload, authMiddleware } = require("../../../middlewares");

const router = express.Router();

router.post(
  "/add",
  authMiddleware.verifyJwtToken,
  upload.array("files"),
  vendorController.vendorServiceController.add
);

router.get(
  "/all",
  authMiddleware.verifyJwtToken,
  vendorController.vendorServiceController.getAll
);
router.get(
  "/:sid",
  authMiddleware.verifyJwtToken,
  vendorController.vendorServiceController.getOne
);

router.put(
  "/:sid",
  authMiddleware.verifyJwtToken,
  upload.array("files"),
  vendorController.vendorServiceController.update
);

router.delete(
  "/all",
  authMiddleware.verifyJwtToken,
  vendorController.vendorServiceController.deleteAll
);
router.delete(
  "/:sid",
  authMiddleware.verifyJwtToken,
  vendorController.vendorServiceController.deleteOne
);

module.exports = router;
