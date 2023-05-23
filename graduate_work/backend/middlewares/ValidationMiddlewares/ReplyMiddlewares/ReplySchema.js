const Joi = require("joi");


class ReplySchema {
    constructor() {
        this.text = Joi.string().max(300).min(0),
        this.telegram = Joi.string().max(300).min(0),
        this.viber = Joi.string().max(300).min(0),
        this.whatsapp = Joi.string().max(300).min(0),
        this.facebook = Joi.string().max(300).min(0),
        this.vkontakte = Joi.string().max(300).min(0)
    }

    newReply() {
        this.text = this.text.required();
        return this;
    }

    updateReply() {
        return this;
    }
}

module.exports = new ReplySchema();
