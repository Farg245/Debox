const jwt = require("jsonwebtoken");
const AppError = require("../controllers/errorController");
const User = require("../models/user");
const { APP_KEY } = require("../config/AppConst");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return AppError.unAuthorised();
    }
    const token = authorization.replace("Bearer ", "");

    let decodedToken;
    try {
      decodedToken = await jwt.verify(token, APP_KEY);
    } catch (err) {
      return AppError.onError(res, "Authorization verification failed!");
    }

    const { userId } = decodedToken;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return AppError.onError(res, "Authorization token is not valid");
      }
      req.user = user;
      next();
    } catch (err) {
      return AppError.onError(res, "Authorization token is not valid");
    }
  } catch (err) {
    next(err);
  }
};
