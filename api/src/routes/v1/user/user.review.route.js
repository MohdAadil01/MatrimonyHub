const express = require("express");
const { userController } = require("../../../controllers");
const { verifyJwtToken } = require("../../../middlewares/auth.middleware");

const router = express.Router();

// router.get("/login", userController.userAuthController.login);
router.get("/", verifyJwtToken, userController.userReviewController.GetReview);
router.post("/", verifyJwtToken, userController.userReviewController.AddReview);

router.post(
  "/:review_id/comment",
  userController.userReviewController.AddReviewComment
);

module.exports = router;
