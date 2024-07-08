const express = require("express");
const { adminController } = require("../../../controllers");
const { verifyJwtToken } = require("../../../middlewares/auth.middleware");

const router = express.Router();

router.get("/dummy", adminController.adminAuthController.dummy);
router.post("/login", adminController.adminAuthController.loginAdmin);
router.post("/register", adminController.adminAuthController.registerAdmin);
router.get("/getusers", verifyJwtToken, adminController.adminAuthController.fetchAllUsers);
router.get("/getVendors", verifyJwtToken, adminController.adminAuthController.fetchAllVendors);
router.post("/addvendors", verifyJwtToken, adminController.adminAuthController.addVendors);
router.delete(
  "/deletevendor/:id", verifyJwtToken,
  adminController.adminAuthController.removeVendor
);

router.post(
  "/createUser",
  adminController.adminAuthController.createUserByAdmin
);
router.put(
  "/updateUser/:id",
  adminController.adminAuthController.updateUserByAdmin
);
router.delete(
  "/deleteUser/:id",
  adminController.adminAuthController.deleteUserByAdmin
);

router.get(
  "/getAllServices",
  adminController.adminAuthController.fetchAllServices
);
router.post(
  "/createService",
  adminController.adminAuthController.createServiceByAdmin
);
router.put(
  "/updateService/:id",
  adminController.adminAuthController.updateServiceByAdmin
);
router.delete(
  "/deleteService/:id",
  adminController.adminAuthController.deleteServiceByAdmin
);

module.exports = router;
