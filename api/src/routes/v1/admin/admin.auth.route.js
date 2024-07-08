const express = require("express");
const { adminController } = require("../../../controllers");

const router = express.Router();

router.get("/dummy", adminController.adminAuthController.dummy);
router.get("/getAllUsers", adminController.adminAuthController.fetchAllUsers);
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