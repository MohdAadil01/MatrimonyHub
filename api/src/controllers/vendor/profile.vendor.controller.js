const createHttpError = require("http-errors");
const { Vendor } = require("../../models");

const view = async (req, res, next) => {
  const { uid } = req.params;
  try {
    const vendor = await Vendor.findById(uid);
    if (!vendor) {
      return next(
        createHttpError(404, "Unable to find vendor with the given id")
      );
    }
    res.status(200).json({
      message: "Vendor found",
      vendor,
    });
  } catch (error) {
    return next(
      createHttpError(500, "Error in finding vendor with the given id")
    );
  }
};

const update = async (req, res, next) => {
  const { uid } = req.params;
  const { businessName, email, phone, password, address } = req.body;
  let vendor;
  try {
    vendor = await Vendor.findById(uid);
    if (!vendor) {
      return next(
        createHttpError(404, "Vendor does not exist with the given id")
      );
    }
  } catch (error) {
    return next(createHttpError(500, "Error while finding vendor in database"));
  }
  try {
    vendor = await Vendor.findByIdAndUpdate(
      uid,
      {
        businessName,
        email,
        phone,
        password,
        address,
      },
      { new: true }
    );
    res.status(200).json({
      message: "Successfully updated vendor",
      vendor,
    });
  } catch (error) {
    return next(
      createHttpError(500, "Error while updating vendor in database")
    );
  }
};

const remove = async (req, res, next) => {
  const { uid } = req.params;
  try {
    const vendor = await Vendor.findById(uid);
    if (!vendor) {
      return next(
        createHttpError(404, "Vendor does not exist with the given id.")
      );
    }
    await vendor.deleteOne();
    res.status(200).json({
      message: "Successfully deleted.",
    });
  } catch (error) {
    return next(
      createHttpError(500, "Error while deleting vendor in database")
    );
  }
};

module.exports = { view, update, remove };
