import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import handleValidationErrors from '../middlewares/handleValidationErrors.js';
import checkAuth from '../middlewares/checkAuth.js';
import loginValidation from '../domain/auth/validations/login.validation.js';
import registerValidation from '../domain/auth/validations/register.validation.js';

const authRouter = Router();

const authController = new AuthController();

authRouter.post(
    '/auth/login',
    loginValidation,
    handleValidationErrors,
    authController.login.bind(authController),
);

authRouter.post(
    '/auth/register',
    registerValidation,
    handleValidationErrors,
    authController.register.bind(authController),
);

authRouter.get('/auth/logout', authController.logout.bind(authController));

authRouter.get('/auth/refresh', authController.refresh.bind(authController));

authRouter.get(
    '/auth/me',
    checkAuth,
    authController.getMe.bind(authController),
);

export default authRouter;
