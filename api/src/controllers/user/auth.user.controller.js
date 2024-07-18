const createHttpError = require("http-errors");
const path = require("path");

const { FieldValidator } = require("../../utils");
const { authMiddleware } = require("../../middlewares");
const { User } = require("../../models");
const { processAndUploadFile } = require("../../utils");

const dummy = async (req, res) => {
  try {
    // !FOR UPLOADING SINGLE FILE
    // const uploadResult = await processAndUploadFile.uploadSingleFile(req.file);

    // !FOR UPLOADING MULTIPLES FILES
    const uploadResult = await processAndUploadFile.uploadMultipleFiles(
      req.files
    );
    res.send(uploadResult);
  } catch (error) {
    console.error("Error in dummy function:", error);
    res.status(500).send("An error occurred while processing the file.");
  }
};

const register = async (req, res, next) => {
  const { email, password, name, phone } = req.body;
  try {
    //!CHECKING WHETHER ALL THE REQUIRED FIELDS ARE FILLED
    if (!email || !password || !name || !phone) {
      return next(createHttpError(400, "Please Enter all fields."));
    }

    // !CHECKING VALIDATION OF ALL THE FILEDS
    if (!FieldValidator.emailValidation(email)) {
      return next(createHttpError(500, "Enter valid email."));
    }
    if (!FieldValidator.passwordValidation(password)) {
      return next(
        createHttpError(500, "Password must be more than 6 character.")
      );
    }
    if (!FieldValidator.nameValidation(name)) {
      return next(createHttpError(500, "Enter valid Name."));
    }
    if (!FieldValidator.phoneValidation(phone)) {
      return next(createHttpError(500, "Enter valid phone."));
    }

    //!CHECKING WHETHER THE USER ALREADY EXIST OR NOT
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return next(createHttpError(400, "User already exists"));
    }

    // !CREATE NEW USER
    const user = await User({
      email,
      password,
      name,
      phone,
    });
    await user.save();
    const token = await authMiddleware.generateJwtToken(user._id, next);
    res.status(200).json({ message: "Registered new user.", user, token });
  } catch (error) {
    return next(createHttpError(400, "Error in registering user. " + error));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //!CHECKING WHETHER ALL THE REQUIRED FIELDS ARE FILLED
    if (!email || !password) {
      return next(createHttpError(400, "Please Enter all fields."));
    }

    // !CHECKING WHETHER USER EXISIT OR NOT
    const userAlreadyExists = await User.findOne({ email });
    if (!userAlreadyExists) {
      return next(
        createHttpError(400, "User does not exists. Please Register first.")
      );
    }else{
      
    }
    const token = await authMiddleware.generateJwtToken(
      userAlreadyExists._id,
      next
    );

    res.status(200).json({
      message: "Signed in",
      user: userAlreadyExists,
      token,
    });
  } catch (error) {
    return next(createHttpError(400, "Error in signing in user. " + error));
  }
};

const logout = async (req, res, next) => {};

module.exports = {
  login,
  logout,
  register,
  dummy,
};
