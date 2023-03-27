import { Router } from "express";
import {
  fullNameValidation,
  passwordValidation,
  emailValidation,
  avatarValidation,
} from "../validations/validations.js";
import {
  UserController,
} from "../controllers/user.controller.js";
import checkAuth from "../middlewares/checkAuth.js";
import handleValidationErrors from "../middlewares/handleValidationErrors.js";
import { getMe } from "../controllers/auth.controller.js";

export const usersRouter = Router();

const userController = new UserController();

usersRouter.get("/users", checkAuth, userController.getUsers.bind(userController));

usersRouter.delete("/users/delete/:id", checkAuth, userController.deleteUser.bind(userController));

usersRouter.patch(
  "/auth/updateUserLogin",
  checkAuth,
  fullNameValidation,
  handleValidationErrors,
  userController.updateUserLogin.bind(userController)
);

usersRouter.patch(
  "/auth/updateUserEmail",
  checkAuth,
  emailValidation,
  handleValidationErrors,
  userController.updateUserEmail.bind(userController)
);

usersRouter.patch(
  "/auth/updateUserPassword",
  checkAuth,
  passwordValidation,
  handleValidationErrors,
  userController.updateUserPassword.bind(userController)
);

usersRouter.patch(
  "/auth/updateUserAvatar",
  checkAuth,
  avatarValidation,
  handleValidationErrors,
  userController.updateUserAvatar.bind(userController)
);

usersRouter.patch(
  "/auth/updateUserRank",
  checkAuth,
  handleValidationErrors,
  userController.updateUserRank.bind(userController)
);

usersRouter.get("/auth/me", checkAuth, getMe);
