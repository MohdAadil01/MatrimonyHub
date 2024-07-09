const createHttpError = require("http-errors");
const path = require("path");
const removePasswordField = require("../../utils/SanitizeUser");
const { User } = require("../../models");
const { FieldValidator } = require("../../utils");

const ViewProfile = async (req, res, next) => {
  try {
    const user = req.user; //User email
    // console.log(user);
    var profile = await User.findOne({ email: user });
    return res.status(200).json(profile);
  } catch (error) {
    return next(createHttpError(400, "Error retrieving profile:" + error));
  }
};

const UpdateProfile = async (req, res, next) => {
  try {
    //req.body={name:"new Name"}
    const user = req.user; //User email

    const keys = Object.keys(req.body);

    let profile = await User.findOne({ email: user });

    keys.forEach((key) => {
      if (key == "name") {
        if (!FieldValidator.nameValidation(req.body.name)) {
          return next(createHttpError(400, "Enter valid Name."));
        }

        profile.name = req.body.name;
      } else if (key == "password") {
        if (!FieldValidator.passwordValidation(req.body.password)) {
          return next(
            createHttpError(400, "Password must be more than 6 character.")
          );
        }
        profile.password = req.body.password;
      } else if (key == "phone") {
        if (!FieldValidator.phoneValidation(req.body.phone)) {
          return next(createHttpError(400, "Enter valid phone."));
        }

        profile.phone = req.body.phone;
      } else if (key == "email") {
        if (!FieldValidator.emailValidation(req.body.email)) {
          return next(createHttpError(400, "Enter valid email."));
        }

        profile.email = req.body.email;
      }
    });
    // console.log(profile);
    await User.updateOne({ email: user }, profile, { upsert: true });
    return res.status(200).json({ message: "Profile Updated", user: profile });
  } catch (error) {
    return next(createHttpError(400, "Error updating profile:" + error));
  }
};

module.exports = {
  ViewProfile,
  UpdateProfile,
};
