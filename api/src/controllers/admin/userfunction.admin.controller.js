

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
  
  

  module.exports = {
    dummy,
    fetchAllUsers,
  };