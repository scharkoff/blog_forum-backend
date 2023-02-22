import { Router } from "express";

// -- Comments controller
import {
  addComment,
  getAllComments,
  removeComment,
  updateComment,
} from "../controllers/CommentController.js";

// -- Посредники
import checkAuth from "../middlewares/checkAuth.js";
import handleValidationErrors from "../middlewares/handleValidationErrors.js";

export const commentsRouter = Router();

// -- Получить комментарий
commentsRouter.post(
  "/posts/:id/addComment",
  checkAuth,
  handleValidationErrors,
  addComment
);

// -- Получить комментарии статьи
commentsRouter.get("/posts/comments", getAllComments);

// -- Удалить комментарий
commentsRouter.post(
  "/posts/:id/removeComment",
  checkAuth,
  handleValidationErrors,
  removeComment
);

// -- Обновить комментарий
commentsRouter.patch(
  "/posts/:id/updateComment",
  checkAuth,
  handleValidationErrors,
  updateComment
);
