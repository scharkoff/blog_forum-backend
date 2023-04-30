import { Router } from 'express';
import CommentController from '../controllers/comment.controller.js';
import checkAuth from '../middlewares/checkAuth.js';
import handleValidationErrors from '../middlewares/handleValidationErrors.js';

const commentsRouter = Router();

const commentController = new CommentController();

commentsRouter.post(
    '/comments/:id',
    checkAuth,
    handleValidationErrors,
    commentController.create.bind(commentController),
);

commentsRouter.get(
    '/comments',
    commentController.findAll.bind(commentController),
);

commentsRouter.get(
    '/comments/lasts',
    commentController.findLasts.bind(commentController),
);

commentsRouter.delete(
    '/comments/:id',
    checkAuth,
    handleValidationErrors,
    commentController.delete.bind(commentController),
);

commentsRouter.patch(
    '/comments/:id',
    checkAuth,
    handleValidationErrors,
    commentController.update.bind(commentController),
);

export default commentsRouter;
