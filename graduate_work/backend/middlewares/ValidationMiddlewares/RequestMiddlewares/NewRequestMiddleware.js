const Joi = require("joi");
const ApiError = require("../../../error/ApiError");
const joiErrorTranscription = require("../joiErrorTranscription");

function validator(data) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      description: Joi.string().min(1).max(300).required(),
      address: Joi.string().min(1).max(300).required(),
      startDate: Joi.date().raw().required(),
      endDate: Joi.date().raw().required(),
      categoryId: Joi.number().integer().required(),
      locationId: Joi.number().integer().required(),
    });

    return schema.validate(data);
};

module.exports = function (req, res, next) {
    const { error } = validator(req.body);
    if (error) {
      return next(ApiError.badRequest(joiErrorTranscription(error)));
    }
    next();
};
