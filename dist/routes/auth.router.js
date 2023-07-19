"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _express=require("express"),_authController=_interopRequireDefault(require("../controllers/auth.controller.js")),_handleValidationErrors=_interopRequireDefault(require("../middlewares/handleValidationErrors.js")),_checkAuth=_interopRequireDefault(require("../middlewares/checkAuth.js")),_loginValidation=_interopRequireDefault(require("../domain/auth/validations/login.validation.js")),_registerValidation=_interopRequireDefault(require("../domain/auth/validations/register.validation.js"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}const authRouter=(0,_express.Router)(),authController=new _authController.default;authRouter.post("/auth/login",_loginValidation.default,_handleValidationErrors.default,authController.login.bind(authController)),authRouter.post("/auth/register",_registerValidation.default,_handleValidationErrors.default,authController.register.bind(authController)),authRouter.get("/auth/logout",authController.logout.bind(authController)),authRouter.get("/auth/refresh",authController.refresh.bind(authController)),authRouter.get("/auth/me",_checkAuth.default,authController.getMe.bind(authController));var _default=authRouter;exports.default=_default;