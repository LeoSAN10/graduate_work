const Joi = require("joi");
const ApiError = require("../../../error/ApiError");
const joiErrorTranscription = require("../joiErrorTranscription");
const passwordRegExp = new RegExp("^[a-zA-Z0-9]{8,20}$");
const phoneRegExp = new RegExp("^[+]?[0-9]{7,14}$");

function validator(data) {
    const schema = Joi.object({
        reason: Joi.string().min(3).max(50).required(),
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
