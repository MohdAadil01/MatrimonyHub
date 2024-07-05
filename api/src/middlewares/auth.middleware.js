const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

const generateJwtToken = async (email, next) => {
  try {
    const token = jwt.sign({ user: email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  } catch (error) {
    return next(createHttpError(500, "Error in generating jwt token."));
  }
};

const verifyJwtToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) {
      return next(500, "Please login/signup first.");
    }
    const token = authHeader.split(" ")[1];
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedData.user;
    next();
  } catch (error) {
    return next(createHttpError(500, "Error in verifying jwt token."));
  }
};

module.exports = {
  generateJwtToken,
  verifyJwtToken,
};
