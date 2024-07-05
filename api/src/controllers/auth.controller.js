const createHttpError = require("http-errors");

const { FieldValidator } = require("../utils");
const { authMiddleware } = require("../middlewares");
const { User } = require("../models");

const dummy = (req, res) => {
  res.send("Working route on the above url");
};

const register = async (req, res, next) => {
  const { email, password, firstName, lastName, phone } = req.body;
  try {
    //!CHECKING WHETHER ALL THE REQUIRED FIELDS ARE FILLED
    if (!email || !password || !firstName || !lastName || !phone) {
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
    if (!FieldValidator.nameValidation(firstName, lastName)) {
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
      firstName,
      lastName,
      phone,
    });
    await user.save();
    const token = await authMiddleware.generateJwtToken(email, next);
    res.status(200).json({ message: "Registered new user.", user, token });
  } catch (error) {
    return next(createHttpError(400, error));
  }
};

const login = async (req, res) => {
  res.send("working");
};

const logout = async (req, res) => {
  res.send("successfully logged out.");
};
module.exports = {
  dummy,
  login,
  logout,
  register,
};
