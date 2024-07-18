const express = require("express");
const { adminController } = require("../../../controllers");
const { verifyJwtToken } = require("../../../middlewares/auth.middleware");

const router = express.Router();

router.get("/dummy", adminController.adminReviewsController.dummy);

router.get("/:vendorId/getreviews", verifyJwtToken, adminController.adminReviewsController.getVendorReviews);
router.delete("/:vendorId/deletereview/:reviewId", verifyJwtToken, adminController.adminReviewsController.deleteVendorReview);

module.exports = router;