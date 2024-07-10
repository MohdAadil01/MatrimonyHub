const express = require("express");
const router = express.Router();

const { vendorProfileController } = require("../../../controllers/vendor");

router.get("/dummy", vendorProfileController.dummy);
router.get("/view/:uid", vendorProfileController.view);
router.put("/update/:uid", vendorProfileController.update);
router.delete("/remove/:uid", vendorProfileController.remove);

module.exports = router;
