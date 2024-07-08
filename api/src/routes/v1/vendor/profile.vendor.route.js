const express = require("express");
const router = express.Router();

const { vendorProfileController } = require("../../../controllers/vendor");

router.get("/dummy", vendorProfileController.dummy);
router.get("/view", vendorProfileController.view);
router.put("/update", vendorProfileController.update);
router.delete("/remove", vendorProfileController.remove);

module.exports = router;
