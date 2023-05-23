const ApiError = require("../error/ApiError");
const UserDataAccess = require("../data_requests/UserDataAccess");
const ResponseCreator = require("../response_creators/ResponseCreator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ReportDataAccess = require("../data_requests/ReportDataAccess");

const maxGenSaltSync = 10;

function generateJWT(id, email) {
  return jwt.sign(
    {id, email},
    process.env.SECRET_KEY,
    {expiresIn: '24h'})
}

class UserController {
  async allUsers(req, res, next) {
    const data = await UserDataAccess.findAllUsers();
    return res.json(ResponseCreator.response(data));
  }

  async reportUser(req, res, next) {
    try {
      const { requestOwnerId, reason } = req.body
      const requestId = req.param("id").slice(1);
      const reportCreatorId = req.user.id;
      if(await ReportDataAccess.findReportByRequestOwnerIdAndReportCreatorId(requestOwnerId, reportCreatorId)) {
        return res.json(ResponseCreator.response({message: "User already made report for owner of this request"}));
      }
      await ReportDataAccess.createReport(reason, requestOwnerId, reportCreatorId, requestId);
      const requestOwnerReports = await ReportDataAccess.findReportsForUser(requestOwnerId);
      if(requestOwnerReports.count >= 3) {
        const user = await UserDataAccess.findUserById(requestOwnerId);
        user.isBlocked = true;
        user._changed.add("isBlocked");
        await user.save();
      }
      return res.json(ResponseCreator.response({message: "Report recorded"}));
    } catch(error) {
      return next(error);
    }    
  }

  async updateProfile(req, res, next) {
    try {
      const user = await UserDataAccess.findUserById(req.user.id);
      for (let key in req.body) {
          user.dataValues[key] = req.body[key];
          user._changed.add(key);
      }      
      user.save();
      return res.json(
          ResponseCreator.response({ message: "Profile has been updated" })
      );
    } catch(error) {
      return next(error);
    }
  }

  async registration(req, res, next) {
    const {name, email, password, phone, profileColor} = req.body;
    const hashPassword = await bcrypt.hash(password, bcrypt.genSaltSync(maxGenSaltSync));
    try {
      const user = await UserDataAccess.createUser(name, email, hashPassword, phone, profileColor);
      return res.json(ResponseCreator.response({message: "User created", token: generateJWT(user.id, email)}));
    } catch(error) {
      return next(error);
    }
  }

  async login(req, res, next) {
    const {email, password} = req.body;
    try{
      const user = await UserDataAccess.findUserByEmail(email);
      if(user.isBlocked) {
        throw ApiError.forbidden("User was blocked");
      }
      const isIdentical = bcrypt.compareSync(password, user.password);
      if(!isIdentical) {
        throw ApiError.unauthorized("Invalid password. Please verify your login ang password and try again");
      }
      return res.json(ResponseCreator.response({message: "User logged in", token: generateJWT(user.id, email), user}))
    } catch(error) {
      return next(error);
    }
  }

  async me(req, res, next) {
    const user = await UserDataAccess.findUserById(req.user.id);
    return res.json(ResponseCreator.response({message: "Authorized user", user}))
  }
  
  async changePassword(req, res, next) {
    const {password} = req.body;
    try{
      const user = await UserDataAccess.findUserById(req.user.id);
      const hashPassword = await bcrypt.hash(password,  bcrypt.genSaltSync(maxGenSaltSync));
      user.password = hashPassword;
      user.save();
      return res.json(ResponseCreator.response({message: "Password was changed", user}));
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new UserController();
