// -- App
import { Router } from "express";

// -- Валидации
import { postCreateValidation } from "../../validations/validations.js";

// -- Post controller
import {
  create,
  getAll,
  getOne,
  remove,
  update,
  getLastTags,
} from "../controllers/PostController.js";

// -- Посредники
import checkAuth from "../middlewares/checkAuth.js";
import handleValidationErrors from "../middlewares/handleValidationErrors.js";

export const postsRouter = Router();

// -- Cоздать статью
postsRouter.post(
  "/posts/create",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  create
);

// -- Последние теги
postsRouter.get("/tags", getLastTags);

// -- Получить все статьи
postsRouter.get("/posts", getAll);

// -- Получить одну статью по ее id
postsRouter.get("/posts/:id", getOne);

// -- Получить последние теги
postsRouter.get("/posts/tags", getLastTags);

// -- Удалить статью по ее id
postsRouter.delete("/posts/:id", checkAuth, remove);

// -- Обновить статью по ее id
postsRouter.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  update
);

