const nodemailer = require("nodemailer");
const UserError = require("../error/ApiError");
const UserDataRequests = require("../data_requests/UserDataAccess")
const ResponseCreator = require("../response_creators/ResponseCreator");
const jwt = require('jsonwebtoken');

const generateCode = () => {
  return Math.round(Math.random() * 1000000);
};

const getEmailData = (to, code) => {  
  return {
    to,
    subject: "KBAB: Verification code",
    html: `
        <h2>Verification code</h2>
        <h3>Your reset password code: ${code}</h3>
        <h4>Don't show it to anybody</h4>`,
  };
};

function generateJWT(id, email) {
  return jwt.sign(
    {id, email}, 
    process.env.SECRET_KEY, 
    {expiresIn: '24h'})
}

const sendEmail = (to, code) => {
  const transporter = nodemailer.createTransport(
    {
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT,
      secure: process.env.MAILER_SECURE,

      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    },
    {
      from: process.env.MAILER_FROM,
    }
  );

  const mail = getEmailData(to, code);

  transporter.sendMail(mail, function (error, response, next) {
    if (error) {
      return next(UserError.serverConflict("Can't send email"));
    } else {
      return response.json(ResponseCreator.response({ message: "email sent" }));
    }
  });
};

class VerificationCodeController {
  constructor() {
    this.verificationCode = null;
    this.sendCode = this.sendCode.bind(this);
    this.recieveCode = this.recieveCode.bind(this);
  }

  async sendCode(req, res, next) {
    this.verificationCode = generateCode();
    try{
      const user = await UserDataRequests.findUserByEmail(req.body.email);
      sendEmail(req.body.email, this.verificationCode);
      user.verificationCode = this.verificationCode;
      user.save();
      return res.json(ResponseCreator.response({ message: "Email sent" }));
    } catch (error) {
      return next(error);
    }
  }

  async recieveCode(req, res, next) {
    try {
      const user = await UserDataRequests.findUserByEmail(req.body.email);
      const code = req.body.code;
      if(user.verificationCode === Number(code)) {
        return res.json(ResponseCreator.response({ message: "Verification passed", token: generateJWT(user.id, this.email) }));
      } else {
        throw UserError.badRequest("The code does not match");
      }
    } catch (error) {
      return next(error);
    }
  }

}

module.exports = new VerificationCodeController();