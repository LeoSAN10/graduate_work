const Router = require("express");
const router = new Router();
const UserController = require("../controllers/UserController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const VerificationCodeController = require("../controllers/VerificationCodeController");
const VerificationSendMiddleware = require("../middlewares/ValidationMiddlewares/VerificationMiddlewares/VerificationSendMiddleware");
const VerificationLoginMiddleware = require("../middlewares/ValidationMiddlewares/VerificationMiddlewares/VerificationLoginMiddleware");
const UserRegistrationMiddleware = require("../middlewares/ValidationMiddlewares/UserMiddlewares/UserRegistrationMiddleware");
const UserLoginMiddleware = require("../middlewares/ValidationMiddlewares/UserMiddlewares/UserLoginMiddleware");
const ChangePasswordMiddleware = require("../middlewares/ValidationMiddlewares/UserMiddlewares/ChangePasswordMiddleware");
const ProfileChangeMiddleware = require("../middlewares/ValidationMiddlewares/UserMiddlewares/ProfileChangeMiddleware");

const path = {
    root: "/",
    verification: "/verification",
    login: "/login",
    me: "/me",
    verificationСode: "/verificationCode",
    password: "/password",
    profile: "/profile"
}

router.get(path.root, UserController.allUsers); 
router.post(path.root, UserRegistrationMiddleware, UserController.registration);
router.post(path.login, UserLoginMiddleware, UserController.login);
router.get(path.me, AuthMiddleware, UserController.me); 
router.post(path.verification, VerificationSendMiddleware, VerificationCodeController.sendCode)
router.post(path.verificationСode, VerificationLoginMiddleware, VerificationCodeController.recieveCode)
router.put(path.password, ChangePasswordMiddleware, AuthMiddleware, UserController.changePassword)
router.put(path.profile, AuthMiddleware, ProfileChangeMiddleware, UserController.updateProfile)

module.exports = router;
