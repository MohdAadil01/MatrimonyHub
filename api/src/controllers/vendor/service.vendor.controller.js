const createHttpError = require("http-errors");
const { Vendor, Service } = require("../../models");
const { processAndUploadFile } = require("../../utils");
const { default: mongoose } = require("mongoose");

// !ADD NEW SERVICE
const add = async (req, res, next) => {
  const { uid } = req.params;
  const { title, description, price, availability, serviceType } = req.body;
  if (!title || !description || !price || !availability || !serviceType) {
    return next(createHttpError(400, "All fields are required."));
  }
  if (!mongoose.Types.ObjectId.isValid(uid)) {
    return next(createHttpError(400, "Invalid vendor ID."));
  }
  let vendor;
  try {
    vendor = await Vendor.findById(uid);
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
      vendor: uid,
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

// !GET SINGLE SERVICE
const getOne = async (req, res, next) => {
  const { uid, sid } = req.params;

  if (
    !mongoose.Types.ObjectId.isValid(uid) ||
    !mongoose.Types.ObjectId.isValid(sid)
  ) {
    return next(createHttpError(400, "Invalid id."));
  }

  let vendor;
  let service;

  try {
    vendor = await Vendor.findById(uid);
    if (!vendor) {
      return next(
        createHttpError(404, "Unable to find vendor with the given id.")
      );
    }

    service = await Service.findById(sid);
    if (!service) {
      return next(
        createHttpError(404, "Unable to find service with the given id.")
      );
    }

    if (String(vendor._id) !== String(service.vendor)) {
      return next(createHttpError(403, "Unauthorized."));
    }

    res.status(200).json({
      message: "Found Service",
      service,
    });
  } catch (error) {
    return next(
      createHttpError(
        500,
        "Error while finding user and service. " + error.message
      )
    );
  }
};

// !GET ALL SERVICE
const getAll = async (req, res, next) => {
  const { uid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(uid)) {
    return next(createHttpError(400, "Invalid id."));
  }

  try {
    const vendor = await Vendor.findById(uid);
    if (!vendor) {
      return next(
        createHttpError(404, "Unable to find vendor with the given id.")
      );
    }

    const services = await Service.find({ vendor: uid });
    res.status(200).json({
      message: "Success",
      services,
    });
  } catch (error) {
    return next(
      createHttpError(
        500,
        "Error while finding the services for the vendor. " + error.message
      )
    );
  }
};

// !UPDATE SERVICE
const update = async (req, res, next) => {
  const { uid, sid } = req.params;
  const { title, description, price, availability, serviceType } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(uid) ||
    !mongoose.Types.ObjectId.isValid(sid)
  ) {
    return next(createHttpError(422, "Invalid id."));
  }

  let vendor;
  let service;

  try {
    vendor = await Vendor.findById(uid);
    if (!vendor) {
      return next(
        createHttpError(404, "Unable to find vendor with the given id.")
      );
    }

    service = await Service.findById(sid);
    if (!service) {
      return next(
        createHttpError(404, "Unable to find service with the given id.")
      );
    }

    if (String(vendor._id) !== String(service.vendor)) {
      return next(createHttpError(403, "Unauthorized."));
    }
  } catch (error) {
    return next(
      createHttpError(500, "Error while finding vendor or service. " + error)
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
    if (title) service.title = title;
    if (description) service.description = description;
    if (price) service.price = price;
    if (availability) service.availability = availability;
    if (serviceType) service.serviceType = serviceType;
    if (req.files && images.length > 0) {
      service.images = images;
    }

    await service.save();
    res.status(200).json({
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    return next(createHttpError(500, "Error while updating service. " + error));
  }
};

// !DELETE SINGLE SERVICE
const deleteOne = async (req, res, next) => {
  const { uid, sid } = req.params;
  if (
    !mongoose.Types.ObjectId.isValid(uid) ||
    !mongoose.Types.ObjectId.isValid(sid)
  ) {
    return next(createHttpError(400, "Invalid id."));
  }

  let vendor;
  let service;
  try {
    vendor = await Vendor.findById(uid);
    if (!vendor) {
      return next(
        createHttpError(404, "Vendor doesn't exist with the given id.")
      );
    }
    service = await Service.findById(sid);
    if (!service) {
      return next(
        createHttpError(404, "Unable to find service with the given id.")
      );
    }
  } catch (error) {
    return next(
      createHttpError(
        500,
        "Error while getting user or service. " + error.message
      )
    );
  }

  if (String(vendor._id) !== String(service.vendor)) {
    return next(createHttpError(403, "Unauthorized."));
  }

  try {
    await service.deleteOne();
    res.status(200).json({
      message: "Deleted",
    });
  } catch (error) {
    return next(
      createHttpError(500, "Error while deleting service. " + error.message)
    );
  }
};

// !DELETE ALL SERVICE
const deleteAll = async (req, res, next) => {
  const { uid } = req.params;
  if (!mongoose.Types.ObjectId.isValid(uid)) {
    return next(createHttpError(400, "Invalid id"));
  }

  let vendor;
  try {
    vendor = await Vendor.findById(uid);
    if (!vendor) {
      return next(createHttpError(404, "Vendor does not exist."));
    }
  } catch (error) {
    return next(
      createHttpError(500, "Error while finding vendor. " + error.message)
    );
  }

  try {
    await Service.deleteMany({ vendor: uid });
    res.status(200).json({
      message: "Deleted all.",
    });
  } catch (error) {
    return next(
      createHttpError(
        500,
        "Error while deleting all services. " + error.message
      )
    );
  }
};

// !TO BE MODIFIED LATER
const deleteImage = async (req, res, next) => {
  const { uid, sid } = req.params;
  const { imageUrl } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(uid) ||
    !mongoose.Types.ObjectId.isValid(sid)
  ) {
    return next(createHttpError(400, "Invalid id."));
  }

  let vendor;
  let service;

  try {
    vendor = await Vendor.findById(uid);
    if (!vendor) {
      return next(
        createHttpError(404, "Unable to find vendor with the given id.")
      );
    }

    service = await Service.findById(sid);
    if (!service) {
      return next(
        createHttpError(404, "Unable to find service with the given id.")
      );
    }

    if (String(vendor._id) !== String(service.vendor)) {
      return next(createHttpError(403, "Unauthorized."));
    }
  } catch (error) {
    return next(
      createHttpError(
        500,
        "Error while finding vendor or service. " + error.message
      )
    );
  }

  try {
    const imageIndex = service.images.findIndex((img) => img === imageUrl);
    if (imageIndex === -1) {
      return next(createHttpError(404, "Image not found."));
    }
    service.images.splice(imageIndex, 1);

    await service.save();

    res.status(200).json({
      message: "Image deleted successfully",
      service,
    });
  } catch (error) {
    return next(
      createHttpError(500, "Error while deleting image. " + error.message)
    );
  }
};

module.exports = { add, getOne, getAll, update, deleteOne, deleteAll };
