const createHttpError = require("http-errors");
const { Vendor } = require("../../models");
const { processAndUploadFile } = require("../../utils");

const view = async (req, res, next) => {
  const { user: id } = req;
  try {
    const vendor = await Vendor.findById(id);
    if (!vendor) {
      return next(
        createHttpError(404, "Vendor does not exist with the given id.")
      );
    }
    res.status(200).json({
      message: "Success",
      portfolio: vendor.portfolio,
    });
  } catch (error) {
    return next(
      createHttpError(500, "Error while getting portfolio. " + error)
    );
  }
};

const add = async (req, res, next) => {
  const { user: id } = req;
  const { title, description, date, city } = req.body;

  let vendor;
  try {
    vendor = await Vendor.findById(id);
    if (!vendor) {
      return next(
        createHttpError(404, "Vendor does not exist with the given id.")
      );
    }
  } catch (error) {
    return next(createHttpError(500, "Error while finding vendor. " + error));
  }

  let images = [];
  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    try {
      const result = await processAndUploadFile.uploadMultipleFiles(req.files);
      images = result.map((image) => image.url);
    } catch (error) {
      return next(
        createHttpError(500, "Error while uploading images. " + error)
      );
    }
  }
  const newPortfolio = {
    title,
    description,
    date,
    city,
    images,
  };
  try {
    vendor.portfolio.push(newPortfolio);
    await vendor.save();

    res.status(201).json({
      message: "Portfolio added successfully.",
      portfolio: vendor.portfolio,
    });
  } catch (error) {
    return next(
      createHttpError(500, "Error while adding portfolio. " + error.message)
    );
  }
};

const update = async (req, res, next) => {
  const { user: id } = req;
  const { pid } = req.params;
  const { title, description, date, city } = req.body;

  let vendor;
  try {
    vendor = await Vendor.findById(id);
    if (!vendor) {
      return next(
        createHttpError(404, "Vendor does not exist with the given id.")
      );
    }
  } catch (error) {
    return next(createHttpError(500, "Error while finding vendor. " + error));
  }

  let images = [];
  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    try {
      const result = await processAndUploadFile.uploadMultipleFiles(req.files);
      images = result.map((image) => image.url);
    } catch (error) {
      return next(
        createHttpError(500, "Error while uploading images. " + error)
      );
    }
  }

  const index = vendor.portfolio.findIndex(
    (item) => item._id.toString() === pid
  );

  if (index === -1) {
    return next(createHttpError(404, "Portfolio item not found."));
  }

  const portfolioItem = vendor.portfolio[index];

  if (title) portfolioItem.title = title;
  if (description) portfolioItem.description = description;
  if (date) portfolioItem.date = date;
  if (city) portfolioItem.city = city;
  if (images.length > 0) portfolioItem.images = images;

  try {
    await vendor.save();
    res.status(200).json({
      message: "Portfolio updated successfully.",
      portfolio: portfolioItem,
    });
  } catch (error) {
    return next(
      createHttpError(500, "Error while updating portfolio. " + error.message)
    );
  }
};

const deleteOne = async (req, res, next) => {
  const { user: id } = req;
  const { pid } = req.params;

  let vendor;
  try {
    vendor = await Vendor.findById(id);
    if (!vendor) {
      return next(
        createHttpError(404, "Vendor does not exist with the given id.")
      );
    }
  } catch (error) {
    return next(createHttpError(500, "Error while finding vendor. " + error));
  }

  const index = vendor.portfolio.findIndex(
    (item) => item._id.toString() === pid
  );

  if (index === -1) {
    return next(createHttpError(404, "Portfolio item not found."));
  }

  vendor.portfolio.splice(index, 1);

  try {
    await vendor.save();
    res.status(200).json({
      message: "Portfolio deleted successfully.",
    });
  } catch (error) {
    return next(
      createHttpError(500, "Error while deleting portfolio. " + error)
    );
  }
};

const deleteAll = async (req, res, next) => {
  const { user: id } = req;

  let vendor;
  try {
    vendor = await Vendor.findById(id);
    if (!vendor) {
      return next(
        createHttpError(404, "Vendor does not exist with the given id.")
      );
    }
  } catch (error) {
    return next(createHttpError(500, "Error while finding vendor. " + error));
  }

  vendor.portfolio = [];

  try {
    await vendor.save();
    res.status(200).json({
      message: "All Portfolio deleted successfully.",
    });
  } catch (error) {
    return next(
      createHttpError(500, "Error while deleting all portfolio. " + error)
    );
  }
};

module.exports = {
  view,
  add,
  update,
  deleteOne,
  deleteAll,
};
