import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import {
  registerValidation,
  loginValidation,
} from "../validations/validations.js";
import handleValidationErrors from "../middlewares/handleValidationErrors.js";
import checkAuth from "../middlewares/checkAuth.js";

export const authRouter = Router();

const authController = new AuthController();

authRouter.post("/auth/login", loginValidation, handleValidationErrors, authController.login.bind(authController));

authRouter.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  authController.register.bind(authController)
);

authRouter.get("/auth/me", checkAuth, authController.getMe.bind(authController));
