const Joi = require("joi");
const ApiError = require("../../../error/ApiError");
const joiErrorTranscription = require("../joiErrorTranscription");
const sortingRegExp = new RegExp("(ASC)|(DESC)");

function validator(data) {
    const schema = Joi.object({
      locations: Joi.string().min(1).max(30),
      categories: Joi.string().min(1).max(30),
      order: Joi.string().pattern(sortingRegExp),
      isActive: Joi.boolean(),
      page: Joi.number().integer(),
      limit: Joi.number().integer(),
      search: Joi.string().min(1).max(30)
    });

    return schema.validate(data);
};

module.exports = function (req, res, next) {
    const { error } = validator(req.query);
    if (error) {
      return next(ApiError.badRequest(joiErrorTranscription(error)));
    }
    next();
};
