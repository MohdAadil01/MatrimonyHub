const express = require("express");

const { vendorServiceController } = require("../../../controllers/vendor");
const { upload } = require("../../../middlewares");

const router = express.Router();

router.get("/dummy", vendorServiceController.dummy);
router.post("/:id/add", upload.array("files"), vendorServiceController.add);

module.exports = router;
