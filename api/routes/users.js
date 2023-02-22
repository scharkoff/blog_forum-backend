import { Router } from "express";

// -- Валидации
import {
  fullNameValidation,
  passwordValidation,
  emailValidation,
  avatarValidation,
} from "../../validations/validations.js";

// -- User controller
import {
  getMe,
  updateUserLogin,
  updateUserEmail,
  updateUserPassword,
  updateUserAvatar,
  getUsers,
  deleteUser,
  updateUserRank,
} from "../controllers/UserController.js";

// -- Посредники
import checkAuth from "../middlewares/checkAuth.js";
import handleValidationErrors from "../middlewares/handleValidationErrors.js";

export const usersRouter = Router();

// -- Получить всех пользователей
usersRouter.get("/users", checkAuth, getUsers);

// -- Удалить пользователя
usersRouter.delete("/users/delete/:id", checkAuth, deleteUser);

// -- Обновить логин пользователя
usersRouter.patch(
  "/auth/updateUserLogin",
  checkAuth,
  fullNameValidation,
  handleValidationErrors,
  updateUserLogin
);

// -- Обновить почту пользователя
usersRouter.patch(
  "/auth/updateUserEmail",
  checkAuth,
  emailValidation,
  handleValidationErrors,
  updateUserEmail
);

// -- Обновить пароль пользователя
usersRouter.patch(
  "/auth/updateUserPassword",
  checkAuth,
  passwordValidation,
  handleValidationErrors,
  updateUserPassword
);

// -- Обновить аватар пользователя
usersRouter.patch(
  "/auth/updateUserAvatar",
  checkAuth,
  avatarValidation,
  handleValidationErrors,
  updateUserAvatar
);

// -- Обновить ранг пользователя
usersRouter.patch(
  "/auth/updateUserRank",
  checkAuth,
  handleValidationErrors,
  updateUserRank
);

// -- Получить информацию о профиле
usersRouter.get("/auth/me", checkAuth, getMe);
