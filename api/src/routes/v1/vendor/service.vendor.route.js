const express = require("express");

const { vendorController } = require("../../../controllers");
const { upload } = require("../../../middlewares");

const router = express.Router();

router.post(
  "/:uid/add",
  upload.array("files"),
  vendorController.vendorServiceController.add
);

router.get("/:uid/all", vendorController.vendorServiceController.getAll);
router.get("/:uid/:sid", vendorController.vendorServiceController.getOne);

router.put(
  "/:uid/:sid",
  upload.array("files"),
  vendorController.vendorServiceController.update
);

router.delete("/:uid/all", vendorController.vendorServiceController.deleteAll);
router.delete("/:uid/:sid", vendorController.vendorServiceController.deleteOne);

module.exports = router;
