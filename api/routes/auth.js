import { Router } from "express";


import { login, register } from "../controllers/UserController.js";


import {
  registerValidation,
  loginValidation,
} from "../validations/validations.js";


import handleValidationErrors from "../middlewares/handleValidationErrors.js";

export const authRouter = Router();

authRouter.post("/auth/login", loginValidation, handleValidationErrors, login);

authRouter.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  register
);

