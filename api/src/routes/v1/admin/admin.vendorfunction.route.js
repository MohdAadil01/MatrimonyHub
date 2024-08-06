const express = require("express");
const { adminController } = require("../../../controllers");
const { verifyJwtToken } = require("../../../middlewares/auth.middleware");

const router = express.Router();

router.get("/getVendors", verifyJwtToken, adminController.adminVendorController.fetchAllVendors);
router.post("/addvendors", verifyJwtToken, adminController.adminVendorController.addVendors);
router.delete(
  "/deletevendor/:id", verifyJwtToken,
  adminController.adminVendorController.removeVendor
);
router.get("/:vendorId/getservices", verifyJwtToken, adminController.adminVendorController.fetchServices);
router.post("/:VendorId/addservice", verifyJwtToken, adminController.adminVendorController.createService);
router.put("/:serviceId/updateservice",verifyJwtToken, adminController.adminVendorController.updateService);
router.delete(
    "/:serviceId/deleteservice", verifyJwtToken,
    adminController.adminVendorController.deleteService
  );

module.exports = router;