const createHttpError = require("http-errors");

const { Vendor } = require("../../models");
const { authMiddleware } = require("../../middlewares");
const { processAndUploadFile, FieldValidator } = require("../../utils");

// vendor auth goes here
const dummy = async (req, res) => {
  res.send("working");
};

const register = async (req, res, next) => {
  const { businessName, email, phone, password, address } = req.body;

  // !CHECKING VALIDATION OF ALL FILEDS
  if (!businessName || !email || !phone || !password || !address) {
    return next(createHttpError(500, "Please enter all the required fields"));
  }
  if (!FieldValidator.emailValidation(email)) {
    return next(createHttpError(400, "Please enter valid email"));
  }
  if (!FieldValidator.phoneValidation(phone)) {
    return next(createHttpError(400, "Please enter valid phone"));
  }
  if (!FieldValidator.passwordValidation(password)) {
    return next(
      createHttpError(400, "Password should be greater than 6 character.")
    );
  }

  // ! CHECKING WHETHER IT ALREADY EXIST OF NOT
  try {
    const isExist = await Vendor.findOne({ email: email });
    if (isExist) {
      return next(500, "Vendor already exists, please login.");
    }
  } catch (error) {
    return next(
      createHttpError(500, "Error in finding vendor in existing database.")
    );
  }

  // !UPLOADING FILES TO CLOUD
  let uploadResult;
  try {
    uploadResult = await processAndUploadFile.uploadMultipleFiles(req.files);
  } catch (error) {
    return next(
      createHttpError(
        500,
        "Error while uploading files to cloud in vendor registration."
      )
    );
  }

  // !CREATING VENDOR DOCUMENT
  try {
    const vendor = await Vendor.create({
      businessName,
      email,
      phone,
      password,
      address,
      portfolio: uploadResult,
    });

    const token = await authMiddleware.generateJwtToken(email);

    res.status(200).json({
      message: "Successfully registered vendor.",
      vendor,
      token,
    });
  } catch (error) {
    return next(createHttpError(500, "Error while registering in vendor."));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // !CHECKING VALIDATION OF ALL FILEDS
  if (!email || !password) {
    return next(createHttpError(400, "Please enter all the required fields"));
  }
  if (!FieldValidator.emailValidation(email)) {
    return next(createHttpError(400, "Please enter valid email"));
  }

  // ! CHECKING WHETHER IT ALREADY EXIST OF NOT
  try {
    const vendor = await Vendor.findOne({ email: email });
    if (!vendor) {
      return next(
        createHttpError(400, "Vendor does not exists, please register first.")
      );
    }
    if (vendor.password !== password) {
      return next(createHttpError(400, "Invalid Credentials."));
    }
    const token = await authMiddleware.generateJwtToken(email);

    res.status(200).json({
      message: "Successfully logged in vendor.",
      vendor,
      token,
    });
  } catch (error) {
    return next(createHttpError(500, "Error in login in vendor."));
  }
};

const logout = async (req, res, next) => {
  try {
  } catch (error) {
    return next(createHttpError(500, "Error while loging out vendor."));
  }
};

module.exports = {
  dummy,
  register,
  login,
  logout,
};
