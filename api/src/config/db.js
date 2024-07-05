const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    const res = await mongoose.connect(process.env.DB_URI);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = connectDb;
