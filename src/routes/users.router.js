import { Router } from "express";
import {
  UserController,
} from "../controllers/user.controller.js";
import checkAuth from "../middlewares/checkAuth.js";
import handleValidationErrors from "../middlewares/handleValidationErrors.js";
import { userUpdateValidation } from "../middlewares/user-update.validation.js";

export const usersRouter = Router();

const userController = new UserController();

usersRouter.get("/users", checkAuth, userController.findAll.bind(userController));

usersRouter.get("/users/:id", checkAuth, userController.findOneById.bind(userController))

usersRouter.delete("/users/:id", checkAuth, userController.delete.bind(userController));

usersRouter.patch(
  "/users/:id",
  checkAuth,
  userUpdateValidation,
  handleValidationErrors,
  userController.updateByCondition.bind(userController)
);


