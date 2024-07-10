const express = require("express");

const { vendorServiceController } = require("../../../controllers/vendor");
const { upload } = require("../../../middlewares");

const router = express.Router();

router.post("/:uid/add", upload.array("files"), vendorServiceController.add);

router.get("/:uid/all", vendorServiceController.getAll);
router.get("/:uid/:sid", vendorServiceController.getOne);

router.put("/:uid/:sid", upload.array("files"), vendorServiceController.update);

router.delete("/:uid/all", vendorServiceController.deleteAll);
router.delete("/:uid/:sid", vendorServiceController.deleteOne);

module.exports = router;
