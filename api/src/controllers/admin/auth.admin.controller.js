const createHttpError = require("http-errors");

const { FieldValidator } = require("../../utils");
const { authMiddleware } = require("../../middlewares");
const { User } = require("../../models");
const { Service } = require("../../models");
const { Vendor } = require("../../models");
const { Admin } = require("../../models");

const dummy = (req, res) => {
  res.send("Working route on the above url");
};

/************ADMIN LOGIN AND REGISTER************/

const registerAdmin = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    //!CHECKING WHETHER ALL THE REQUIRED FIELDS ARE FILLED
    if (!email || !password || !name) {
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
    

    //!CHECKING WHETHER THE USER ALREADY EXIST OR NOT
    const adminAlreadyExists = await Admin.findOne({ email });
    if (adminAlreadyExists) {
      return next(createHttpError(400, "Admin already exists"));
    }

    // !CREATE NEW USER
    const admin = await Admin({
      email,
      password,
      name
    });
    await admin.save();
    const token = await authMiddleware.generateJwtToken(email, next);
    res.status(200).json({ message: "Registered new Admin.", admin, token });
  } catch (error) {
    return next(createHttpError(400, "Error in registering Admin. " + error));
  }
};

const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //!CHECKING WHETHER ALL THE REQUIRED FIELDS ARE FILLED
    if (!email || !password) {
      return next(createHttpError(400, "Please Enter all fields."));
    }

    // !CHECKING WHETHER USER EXISIT OR NOT
    const adminAlreadyExists = await Admin.findOne({ email });
    if (!adminAlreadyExists) {
      return next(
        createHttpError(400, "Admin does not exists. Please Register first.")
      );
    }
    //CHECKING PASSWORD
    if (password !== adminAlreadyExists.password) {
      return next(createHttpError(400, "Invalid Password."));
    }
    const token = await authMiddleware.generateJwtToken(email, next);

    res.status(200).json({
      message: "Signed in",
      user: adminAlreadyExists,
      token,
    });
  } catch (error) {
    return next(createHttpError(400, "Error in signing in Admin. " + error));
  }
};





module.exports = {
  dummy,
  registerAdmin,
  loginAdmin
};
