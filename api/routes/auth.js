import { Router } from "express";

// -- Контроллеры
import { login, register } from "../controllers/UserController.js";

// -- Валидации
import {
  registerValidation,
  loginValidation,
} from "../../validations/validations.js";

// -- Посредники
import handleValidationErrors from "../middlewares/handleValidationErrors.js";

export const authRouter = Router();

authRouter.post("/auth/login", loginValidation, handleValidationErrors, login);

authRouter.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  register
);

