const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");
const UserDataAccess = require("../data_requests/UserDataAccess");

module.exports = async function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const head = req.headers.authorization?.split(" ")[0];
    if (!token || head !== "Bearer") {
      throw ApiError.unauthorized("Unauthorized");
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    const user = await UserDataAccess.findUserById(req.user.id);
    if(user.isBlocked) {
      throw ApiError.forbidden("User was blocked");
    }
    next();
  } catch (error) {
    next(error);
  }
};
