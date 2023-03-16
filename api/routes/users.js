import { Router } from "express";


import {
  fullNameValidation,
  passwordValidation,
  emailValidation,
  avatarValidation,
} from "../validations/validations.js";


import {
  updateUserLogin,
  updateUserEmail,
  updateUserPassword,
  updateUserAvatar,
  getUsers,
  deleteUser,
  updateUserRank,
} from "../controllers/UserController.js";


import checkAuth from "../middlewares/checkAuth.js";
import handleValidationErrors from "../middlewares/handleValidationErrors.js";
import { getMe } from "../controllers/AuthController.js";

export const usersRouter = Router();


usersRouter.get("/users", checkAuth, getUsers);


usersRouter.delete("/users/delete/:id", checkAuth, deleteUser);


usersRouter.patch(
  "/auth/updateUserLogin",
  checkAuth,
  fullNameValidation,
  handleValidationErrors,
  updateUserLogin
);


usersRouter.patch(
  "/auth/updateUserEmail",
  checkAuth,
  emailValidation,
  handleValidationErrors,
  updateUserEmail
);


usersRouter.patch(
  "/auth/updateUserPassword",
  checkAuth,
  passwordValidation,
  handleValidationErrors,
  updateUserPassword
);


usersRouter.patch(
  "/auth/updateUserAvatar",
  checkAuth,
  avatarValidation,
  handleValidationErrors,
  updateUserAvatar
);


usersRouter.patch(
  "/auth/updateUserRank",
  checkAuth,
  handleValidationErrors,
  updateUserRank
);


usersRouter.get("/auth/me", checkAuth, getMe);
