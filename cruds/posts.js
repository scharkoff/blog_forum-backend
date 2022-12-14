// -- App
import { app } from "../index.js";

// -- Валидации
import { postCreateValidation } from "../validations/validations.js";

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
import checkAuth from "../utils/checkAuth.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";

export const posts = () => {
  // -- Cоздать статью
  app.post(
    "/posts/create",
    checkAuth,
    postCreateValidation,
    handleValidationErrors,
    create
  );

  // -- Получить все статьи
  app.get("/posts", getAll);

  // -- Получить одну статью по ее id
  app.get("/posts/:id", getOne);

  // -- Получить последние теги
  app.get("/posts/tags", getLastTags);

  // -- Удалить статью по ее id
  app.delete("/posts/:id", checkAuth, remove);

  // -- Обновить статью по ее id
  app.patch(
    "/posts/:id",
    checkAuth,
    postCreateValidation,
    handleValidationErrors,
    update
  );
};
