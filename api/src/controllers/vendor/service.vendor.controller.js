const createHttpError = require("http-errors");
const { Vendor, Service } = require("../../models");
const { processAndUploadFile } = require("../../utils");
const { default: mongoose } = require("mongoose");

const dummy = async (req, res) => {
  res.send("working");
};

// !ADD NEW SERVICE
const add = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, price, availability, serviceType } = req.body;
  if (!title || !description || !price || !availability || !serviceType) {
    return next(createHttpError(400, "All fields are required."));
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createHttpError(400, "Invalid vendor ID."));
  }
  let vendor;
  try {
    vendor = await Vendor.findById(id);
    if (!vendor) {
      return next(createHttpError(401, "Unauthenticated."));
    }
  } catch (error) {
    return next(
      createHttpError(500, "Unable to find user with the given id. " + error)
    );
  }
  let images = [];
  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    try {
      const result = await processAndUploadFile.uploadMultipleFiles(req.files);
      images = result.map((item) => item.url);
    } catch (error) {
      return next(
        createHttpError(
          500,
          "Error while uploading images in service. " + error
        )
      );
    }
  }

  try {
    const service = await Service.create({
      vendor: id,
      title,
      description,
      price,
      availability,
      serviceType,
      images,
    });
    res.status(201).json({
      message: "Added.",
      service,
    });
  } catch (error) {
    return next(createHttpError(500, "Error in creating service. " + error));
  }
};

const getOne = async (req, res, next) => {
  res.send("add");
};
const getAll = async (req, res, next) => {
  res.send("see all");
};
const update = async (req, res, next) => {
  res.send("add");
};
const deleteOne = async (req, res, next) => {
  res.send("add");
};
const deleteAll = async (req, res, next) => {
  res.send("add");
};

module.exports = { dummy, add };
