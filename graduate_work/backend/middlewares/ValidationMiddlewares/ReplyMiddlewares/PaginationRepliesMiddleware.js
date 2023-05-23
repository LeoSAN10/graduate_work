const Joi = require("joi");
const ApiError = require("../../../error/ApiError");
const joiErrorTranscription = require("../joiErrorTranscription");

function validator(data) {
    const schema = Joi.object({
        page: Joi.number().integer().required(),
        limit: Joi.number().integer().required(),
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