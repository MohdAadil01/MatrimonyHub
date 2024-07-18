const createHttpError = require("http-errors");
const { User, Service, Booking, Vendor, Review } = require("../../models");

const AddReview = async (req, res, next) => {
  try {
    if (
      !req.body.serviceId ||
      !req.body.vendorId ||
      !req.body.rating ||
      !req.body.comment
    )
      return next(createHttpError(400, "Invalid Parameters"));

    const user = req.user;

    const service = await Service.findById(req.body.serviceId);
    if (!service) return next(createHttpError(400, "Invalid serviceId"));

    const vendor = await Vendor.findById(req.body.vendorId);
    if (!vendor) return next(createHttpError(400, "Invalid vendorId"));

    const NewReview = new Review({
      userId: user,
      serviceId: req.body.serviceId,
      vendorId: req.body.vendorId,
      rating: req.body.rating,
      comment: req.body.comment,
    });
    await NewReview.save();
    return res.status(200).json({
      success: true,
      message: "New Review created successfully",
      data: NewReview,
    });
  } catch (error) {
    return next(createHttpError(500, "Error adding review: " + error));
  }
};

const GetReview = async (req, res, next) => {
  try {
    const reviews = await Review.find();
    if (!reviews) return next(createHttpError(500, "Error Fetching Reviews"));

    return res.status(200).json({
      success: true,
      message: "Review fetched successfully",
      data: reviews,
    });
  } catch (error) {
    return next(createHttpError(500, "Error fetching reviews: " + error));
  }
};

const AddReviewComment = async (req, res, next) => {
  try {
    if (!req.body.comment)
      return next(createHttpError(400, "Missing Parameters"));

    const ReviewId = req.params.review_id;

    const review = await Review.findById(ReviewId);
    if (!review) return next(createHttpError(400, "Invalid reviewId"));

    const userId = req.user;

    review.comments.push({
      user: userId,
      comment: req.body.comment,
    });

    await review.save();

    return res.status(200).json({
      success: true,
      message: "Comment added successfully",
    });
  } catch (error) {
    return next(createHttpError(500, "Error Adding comment: " + error));
  }
};

module.exports = { GetReview, AddReview, AddReviewComment };
