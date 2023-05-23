const Joi = require("joi");
const passwordRegExp = new RegExp("^[a-zA-Z0-9]{8,20}$");
const phoneRegExp = new RegExp("^[+]?[0-9]{7,14}$");

const defaultValidations = {
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().pattern(passwordRegExp),
    phone: Joi.string().min(7).max(25).pattern(phoneRegExp),
    profileColor: Joi.string().min(5).max(7),
}

class UserSchema {
    registration() {
        return {
            name: defaultValidations.name.required(),
            email: defaultValidations.email.required(),
            password: defaultValidations.password.required(),
            phone: defaultValidations.phone.required(),
            profileColor: defaultValidations.profileColor
        }
    }

    updateProfile() {
        return {
            name: defaultValidations.name,
            email: defaultValidations.email,
            phone: defaultValidations.phone,
        }
    }

    login() {
        return {
            email: defaultValidations.email.required(),
            password: defaultValidations.password.required(),
        }
    }

    newPassword() {
        return {
            password: defaultValidations.password.required(),
        }
    }
}

module.exports = new UserSchema();
