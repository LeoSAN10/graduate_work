const Joi = require("joi");
const ApiError = require("../../../error/ApiError");
const joiErrorTranscription = require("../joiErrorTranscription");

function validator(data) {
    const schema = Joi.object({
        email: Joi.string().required().email(),
    })

    return schema.validate(data);
};

module.exports = function (req, res, next) {
    const { error } = validator(req.body);
    if (error) {
      return next(ApiError.badRequest(joiErrorTranscription(error)));
    }
    next();
};