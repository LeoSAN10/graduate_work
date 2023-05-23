
module.exports = function joiErrorTranscription(error) {
    return error.details[0].message.replace(/[/"]/g, "");
};
