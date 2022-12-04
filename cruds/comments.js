// -- App
import { app } from "../index.js";

// -- Comments controller
import {
  addComment,
  getAllComments,
  removeComment,
  updateComment,
} from "../controllers/CommentController.js";

// -- Посредники
import checkAuth from "../utils/checkAuth.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
import responseHeaders from "../utils/responseHeaders.js";

// -- CRUD для комментариев
export const comments = () => {
  // -- Получить комментарий
  app.post(
    "/posts/:id/addComment",
    checkAuth,
    handleValidationErrors,
    addComment
  );

  // -- Получить комментарии статьи
  app.get("/posts/comments", responseHeaders, getAllComments);

  // -- Удалить комментарий
  app.post(
    "/posts/:id/removeComment",
    checkAuth,
    handleValidationErrors,
    removeComment
  );

  // -- Обновить комментарий
  app.patch(
    "/posts/:id/updateComment",
    checkAuth,
    handleValidationErrors,
    updateComment
  );
};
