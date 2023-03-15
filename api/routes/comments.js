import { Router } from "express";


import {
  addComment,
  getAllComments,
  removeComment,
  updateComment,
} from "../controllers/CommentController.js";


import checkAuth from "../middlewares/checkAuth.js";
import handleValidationErrors from "../middlewares/handleValidationErrors.js";

export const commentsRouter = Router();


commentsRouter.post(
  "/posts/:id/addComment",
  checkAuth,
  handleValidationErrors,
  addComment
);


commentsRouter.get("/posts/comments", getAllComments);


commentsRouter.post(
  "/posts/:id/removeComment",
  checkAuth,
  handleValidationErrors,
  removeComment
);


commentsRouter.patch(
  "/posts/:id/updateComment",
  checkAuth,
  handleValidationErrors,
  updateComment
);
