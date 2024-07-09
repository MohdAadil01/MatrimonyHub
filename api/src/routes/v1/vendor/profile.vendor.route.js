const express = require("express");
const router = express.Router();

const { vendorProfileController } = require("../../../controllers/vendor");

router.get("/dummy", vendorProfileController.dummy);
router.get("/view/:id", vendorProfileController.view);
router.put("/update/:id", vendorProfileController.update);
router.delete("/remove/:id", vendorProfileController.remove);

module.exports = router;
