

const { User } = require("../../models");


const dummy = (req, res) => {
    res.send("Working route on the above url");
  };

  /****************View All Users****************/

// fetch all users by admin
const fetchAllUsers = async (req, res, next) => {
    try {
      const users = await User.find();
      if (users.length === 0) {
        return res.status(404).json({ message: "No users found." });
      }
      res.status(200).json(users);
    } catch (error) {
      return next(createHttpError(400, "Error in fetching users. " + error));
    }
  };
  
  
  //update a particular user by admin
  
  const updateUserByAdmin = async (req, res, next) => {
    const { id } = req.params;
    const { email, firstName, lastName, phone, role } = req.body;
    try {
      if (!email || !firstName || !lastName || !phone || !role) {
        return next(createHttpError(400, "Please enter all fields."));
      }
  
      if (!FieldValidator.emailValidation(email)) {
        return next(createHttpError(500, "Enter a valid email."));
      }
      if (!FieldValidator.nameValidation(firstName, lastName)) {
        return next(createHttpError(500, "Enter a valid name."));
      }
      if (!FieldValidator.phoneValidation(phone)) {
        return next(createHttpError(500, "Enter a valid phone number."));
      }
  
      const user = await User.findById(id);
      if (!user) {
        return next(createHttpError(404, "User not found."));
      }
  
      user.email = email;
      user.firstName = firstName;
      user.lastName = lastName;
      user.phone = phone;
      user.role = role;
  
      await user.save();
      res.status(200).json({ message: "User updated by admin.", user });
    } catch (error) {
      return next(
        createHttpError(400, "Error in updating user by admin. " + error)
      );
    }
  };
  
  //delete users by admin
  
  const deleteUserByAdmin = async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return next(createHttpError(404, "User not found."));
      }
      res.status(200).json({ message: "User deleted by admin.", user });
    } catch (error) {
      return next(
        createHttpError(400, "Error in deleting user by admin. " + error)
      );
    }
  };
  

  module.exports = {
    dummy,
    fetchAllUsers,
    updateUserByAdmin,
    deleteUserByAdmin
  };