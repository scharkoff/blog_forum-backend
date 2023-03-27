import { authRouter } from "./auth.js";
import { usersRouter } from "./users.js";
import { commentsRouter } from "./comments.js";
import { postsRouter } from "./posts.js";
import { multerRouter } from "./multer.js";

export const routes = [authRouter, usersRouter, commentsRouter, postsRouter, multerRouter];