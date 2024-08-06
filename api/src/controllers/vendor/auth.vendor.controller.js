const createHttpError = require("http-errors");

const { Vendor } = require("../../models");
const { authMiddleware } = require("../../middlewares");
const { FieldValidator } = require("../../utils");

// vendor auth goes here
const dummy = async (req, res) => {
  res.send("working");
};

const register = async (req, res, next) => {
  const { businessName, email, phone, password, address } = req.body;

  // !CHECKING VALIDATION OF ALL FIELDS
  if (!businessName || !email || !phone || !password || !address) {
    return next(createHttpError(400, "Please enter all the required fields"));
  }
  if (!FieldValidator.emailValidation(email)) {
    return next(createHttpError(400, "Please enter a valid email"));
  }
  if (!FieldValidator.phoneValidation(phone)) {
    return next(createHttpError(400, "Please enter a valid phone number"));
  }
  if (!FieldValidator.passwordValidation(password)) {
    return next(
      createHttpError(400, "Password should be greater than 6 characters.")
    );
  }

  // ! CHECKING WHETHER IT ALREADY EXISTS OR NOT
  try {
    const isExist = await Vendor.findOne({ email: email });
    if (isExist) {
      return next(createHttpError(409, "Vendor already exists, please login."));
    }
  } catch (error) {
    return next(
      createHttpError(500, "Error in finding vendor in existing database.")
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
    });

    const token = await authMiddleware.generateJwtToken(vendor._id);

    res.status(201).json({
      message: "Successfully registered vendor.",
      vendor,
      token,
    });
  } catch (error) {
    return next(createHttpError(500, "Error while registering vendor."));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // !CHECKING VALIDATION OF ALL FIELDS
  if (!email || !password) {
    return next(createHttpError(400, "Please enter all the required fields"));
  }
  if (!FieldValidator.emailValidation(email)) {
    return next(createHttpError(400, "Please enter a valid email"));
  }

  // ! CHECKING WHETHER IT ALREADY EXISTS OR NOT
  try {
    const vendor = await Vendor.findOne({ email: email });
    if (!vendor) {
      return next(
        createHttpError(404, "Vendor does not exist, please register first.")
      );
    }
    if (vendor.password !== password) {
      return next(createHttpError(401, "Invalid credentials."));
    }
    const token = await authMiddleware.generateJwtToken(vendor._id);

    res.status(200).json({
      message: "Successfully logged in vendor.",
      vendor,
      token,
    });
  } catch (error) {
    return next(createHttpError(500, "Error in logging in vendor."));
  }
};

module.exports = {
  dummy,
  register,
  login,
};
