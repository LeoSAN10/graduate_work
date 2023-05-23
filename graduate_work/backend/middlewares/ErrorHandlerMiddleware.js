const responseCreator = require("../response_creators/ResponseCreator");
const { NotFoundDAOError } = require("../error/DAOError");
const ApiError = require("../error/ApiError");
const Sequelize = require('sequelize');

module.exports = function (err, req, res, next) {
  if(err instanceof NotFoundDAOError) { 
    return res
    .status(400)
    .json(responseCreator.error(err.message));
  }
  if(err instanceof ApiError) {
    return res
    .status(err.status)
    .json(responseCreator.error(err.message))
  }
  console.error("Unhandled error: " + err);
  if(err instanceof Sequelize.ValidationError) {
    return res
    .status(err.status || 400)
    .json(responseCreator.error(err.errors[0].message || "Something went wrong"))
  }
  if(err instanceof Sequelize.Error) {
    return res
    .status(err.status || 400)
    .json(responseCreator.error(err.original?.detail ||  "Something went wrong"))
  }
  return res
    .status(err.status || 500)
    .json(responseCreator.error(err.message || "Something went wrong"));
};
