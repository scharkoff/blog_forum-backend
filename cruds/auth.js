// -- App
import { app } from "../index.js";

// -- Контроллеры
import { login, register } from "../controllers/UserController.js";

// -- Валидации
import {
  registerValidation,
  loginValidation,
} from "../validations/validations.js";

// -- Посредники
import handleValidationErrors from "../utils/handleValidationErrors.js";

// -- Авторазиция и регистрация пользователей
export const auth = () => {
  // -- Авторизация пользователей
  app.post("/auth/login", loginValidation, handleValidationErrors, login);

  // -- Регистрация пользователей
  app.post(
    "/auth/register",
    registerValidation,
    handleValidationErrors,
    register
  );
};
