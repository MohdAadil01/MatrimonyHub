const express = require("express");
const { adminController } = require("../../../controllers");
const { verifyJwtToken } = require("../../../middlewares/auth.middleware");

const router = express.Router();


router.get("/getusers", verifyJwtToken, adminController.adminUserController.fetchAllUsers);
router.put(
    "/updateuser/:id", verifyJwtToken,
    adminController.adminUserController.updateUserByAdmin
  );
  router.delete(
    "/deleteuser/:id", verifyJwtToken,
    adminController.adminUserController.deleteUserByAdmin
  );

module.exports = router;