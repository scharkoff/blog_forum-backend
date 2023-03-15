
import { Router } from "express";


import { postCreateValidation } from "../validations/validations.js";


import {
  create,
  getAll,
  getOne,
  remove,
  update,
  getLastTags,
} from "../controllers/PostController.js";


import checkAuth from "../middlewares/checkAuth.js";
import handleValidationErrors from "../middlewares/handleValidationErrors.js";

export const postsRouter = Router();


postsRouter.post(
  "/posts/create",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  create
);


postsRouter.get("/tags", getLastTags);


postsRouter.get("/posts", getAll);


postsRouter.get("/posts/:id", getOne);


postsRouter.get("/posts/tags", getLastTags);


postsRouter.delete("/posts/:id", checkAuth, remove);


postsRouter.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  update
);

