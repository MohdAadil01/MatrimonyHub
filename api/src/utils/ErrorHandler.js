const { config } = require("dotenv");
config();
const ErrorHandler = (err, req, res, next) => {
  const isDevelopment = process.env.NODE_ENV === "development";

  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";

  const errorResponse = {
    message: errorMessage,
  };

  if (isDevelopment) {
    errorResponse.errorStack = err.stack || "No stack trace available";
  }

  res.status(statusCode).json(errorResponse);
};

module.exports = ErrorHandler;
