const express = require("express");
const router = express.Router();

const { vendorController } = require("../../../controllers");

router.get("/view/:uid", vendorController.vendorProfileController.view);
router.put("/update/:uid", vendorController.vendorProfileController.update);
router.delete("/remove/:uid", vendorController.vendorProfileController.remove);

module.exports = router;
