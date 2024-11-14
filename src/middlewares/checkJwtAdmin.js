const jwt = require("jsonwebtoken");
const StatusCodes = require("http-status-codes").StatusCodes;
const config = require("../../config/config");

const checkJwtAdmin = (req, res, next) => {
  const token = req.cookies.authorization;

  try {
    const user = jwt.verify(token, config.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).redirect("/adminsecret/login");
  }
};

module.exports = checkJwtAdmin;
