import { Router } from "express";
import { CommentController } from "../controllers/comment.controller.js";
import checkAuth from "../middlewares/checkAuth.js";
import handleValidationErrors from "../middlewares/handleValidationErrors.js";

export const commentsRouter = Router();

const commentController = new CommentController();

commentsRouter.post(
  "/posts/comments/:id",
  checkAuth,
  handleValidationErrors,
  commentController.create.bind(commentController)
);

commentsRouter.get("/posts/comments", commentController.getAll.bind(commentController));

commentsRouter.delete(
  "/posts/comments/:id",
  checkAuth,
  handleValidationErrors,
  commentController.remove.bind(commentController)
);

commentsRouter.patch(
  "/posts/comments/:id",
  checkAuth,
  handleValidationErrors,
  commentController.update.bind(commentController)
);
