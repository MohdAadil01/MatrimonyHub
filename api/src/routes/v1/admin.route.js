const express = require("express");
const {adminController}  = require("../../controllers");

const router = express.Router();

router.get("/dummy", adminController.dummy);
router.get("/getAllUsers", adminController.fetchAllUsers);
router.post("/createUser", adminController.createUserByAdmin);
router.put("/updateUser/:id", adminController.updateUserByAdmin);
router.delete("/deleteUser/:id", adminController.deleteUserByAdmin);

router.get("/getAllServices", adminController.fetchAllServices);
router.post("/createService", adminController.createServiceByAdmin);
router.put("/updateService/:id", adminController.updateServiceByAdmin);
router.delete("/deleteService/:id", adminController.deleteServiceByAdmin);

module.exports = router;