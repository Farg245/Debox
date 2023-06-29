const jwt = require("jsonwebtoken");
const { ADMIN_SECRET_KEY } = require("../config/AppConst");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.get("Authorization");
    if (!authorization) {
      return res.status(401).json({ message: "Authorization error" });
    }

    const token = authorization.split(" ")[1];
    let decodedToken;

    try {
      decodedToken = jwt.verify(token, ADMIN_SECRET_KEY);
    } catch (err) {
      return res.status(500).json({ message: "Unable to authenticate" });
    }

    if (!decodedToken || !decodedToken.isAdmin) {
      return res.status(401).json({ message: "User is not authorized" });
    }

    next();
  } catch (err) {
    next(err);
  }
};