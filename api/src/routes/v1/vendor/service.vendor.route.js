const express = require("express");

const { vendorServiceController } = require("../../../controllers/vendor");
const { upload } = require("../../../middlewares");

const router = express.Router();

router.get("/dummy", vendorServiceController.dummy);

router.post("/:id/add", upload.array("files"), vendorServiceController.add);

router.get("/:id/all", vendorServiceController.getAll);
router.get("/:id/:sId", vendorServiceController.getOne);

router.put("/:id/:sId", upload.array("files"), vendorServiceController.update);

router.delete("/:id/all", vendorServiceController.deleteAll);
router.delete("/:id/:sId", vendorServiceController.deleteOne);

module.exports = router;
