import { Router } from 'express';
import checkAuth from '../middlewares/checkAuth.js';
import handleValidationErrors from '../middlewares/handleValidationErrors.js';
import postCreateValidation from '../domain/post/validations/post.validation.js';
import PostController from '../controllers/post.controller.js';

const postsRouter = Router();

const postController = new PostController();

postsRouter.post(
    '/posts',
    checkAuth,
    postCreateValidation,
    handleValidationErrors,
    postController.create.bind(postController),
);

postsRouter.get('/tags/lasts', postController.getLastTags.bind(postController));

postsRouter.get('/posts/all', postController.findAll.bind(postController));

postsRouter.get('/posts', postController.findByPage.bind(postController));

postsRouter.get('/posts/:id', postController.findOneById.bind(postController));

postsRouter.delete(
    '/posts/:id',
    checkAuth,
    postController.remove.bind(postController),
);

postsRouter.patch(
    '/posts/:id',
    checkAuth,
    postCreateValidation,
    handleValidationErrors,
    postController.update.bind(postController),
);

export default postsRouter;
