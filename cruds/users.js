// -- App
import { app } from "../index.js";

// -- Валидации
import {
  fullNameValidation,
  passwordValidation,
  emailValidation,
  avatarValidation,
} from "../validations/validations.js";

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
import checkAuth from "../utils/checkAuth.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
import responseHeaders from "../utils/responseHeaders.js";

// -- CRUD для пользователей
export const users = () => {
  // -- Получить всех пользователей
  app.get("/users", responseHeaders, checkAuth, getUsers);

  // -- Удалить пользователя
  app.delete("/users/delete/:id", checkAuth, deleteUser);

  // -- Обновить логин пользователя
  app.patch(
    "/auth/updateUserLogin",
    checkAuth,
    fullNameValidation,
    handleValidationErrors,
    updateUserLogin
  );

  // -- Обновить почту пользователя
  app.patch(
    "/auth/updateUserEmail",
    checkAuth,
    emailValidation,
    handleValidationErrors,
    updateUserEmail
  );

  // -- Обновить пароль пользователя
  app.patch(
    "/auth/updateUserPassword",
    checkAuth,
    passwordValidation,
    handleValidationErrors,
    updateUserPassword
  );

  // -- Обновить аватар пользователя
  app.patch(
    "/auth/updateUserAvatar",
    checkAuth,
    avatarValidation,
    handleValidationErrors,
    updateUserAvatar
  );

  // -- Обновить ранг пользователя
  app.patch(
    "/auth/updateUserRank",
    checkAuth,
    handleValidationErrors,
    updateUserRank
  );

  // -- Получить информацию о профиле
  app.get("/auth/me", responseHeaders, checkAuth, getMe);
};
