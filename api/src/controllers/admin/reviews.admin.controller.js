const createHttpError = require("http-errors");

const { Vendor } = require("../../models");

const { Review } = require("../../models");

const dummy = (req, res) => {
  res.send("Working route on the above url");
};

/**********************View reviews of a particular vendor **************************/

const getVendorReviews = async (req, res, next) => {
  const { vendorId } = req.params;

  try {
  
    // Check if the vendor exists
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return next(createHttpError(404, "Vendor not found"));
    }

    // Find reviews for the vendor
    const reviews = await Review.find({ vendor_id:vendorId })
    .populate('rating');

    res.status(200).json({ message: "Reviews fetched successfully", reviews });
  } catch (error) {
    return next(
      createHttpError(500, `Error fetching reviews: ${error.message}`)
    );
  }
};

/****************************delete review of a particular vendor ************************/

const deleteVendorReview = async (req, res, next) => {
    const { vendorId, reviewId } = req.params;
  
    try {
      // Check if the vendor exists
      const vendor = await Vendor.findById(vendorId);
      if (!vendor) {
        return next(createHttpError(404, "Vendor not found"));
      }
  
      // Check if the review exists
      const review = await Review.findByIdAndDelete(reviewId);
      if (!review) {
        return next(createHttpError(404, "Review not found"));
      }
  
      res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      return next(
        createHttpError(500, `Error deleting review: ${error.message}`)
      );
    }
  };
  
  
module.exports = { dummy, getVendorReviews, deleteVendorReview };
