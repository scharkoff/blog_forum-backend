import { authRouter } from './auth.router.js';
import { usersRouter } from './users.router.js';
import { commentsRouter } from './comments.router.js';
import { postsRouter } from './posts.router.js';
import { multerRouter } from './multer.router.js';

export const routes = [
  authRouter,
  usersRouter,
  commentsRouter,
  postsRouter,
  multerRouter,
];
