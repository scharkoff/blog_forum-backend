import { Router } from "express";

import { postCreateValidation } from "../validations/validations.js";

import checkAuth from "../middlewares/checkAuth.js";
import handleValidationErrors from "../middlewares/handleValidationErrors.js";
import { PostService } from "../domain/post/post.service.js";

export const postsRouter = Router();

const postService = new PostService();

postsRouter.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  postService.create.bind(postService)
);

postsRouter.get("/tags", postService.getLastTags.bind(postService));

postsRouter.get("/posts", postService.findAll.bind(postService));

postsRouter.get("/posts/:id", postService.findOneById.bind(postService));

postsRouter.delete("/posts/:id", checkAuth, postService.remove.bind(postService));

postsRouter.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  postService.update.bind(postService)
);

