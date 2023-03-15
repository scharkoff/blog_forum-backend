import express from "express";

import cors from "cors";

import { authRouter } from "./api/routes/auth.js";
import { usersRouter } from "./api/routes/users.js";
import { commentsRouter } from "./api/routes/comments.js";
import { postsRouter } from "./api/routes/posts.js";
import { multerRouter } from "./api/routes/multer.js";

import { getConnection } from "./api/configs/config.js";

export const app = express();

getConnection();
app.use(express.json());
app.use(cors());

app.use(multerRouter);
app.use(authRouter);
app.use(usersRouter);
app.use(commentsRouter);
app.use(postsRouter);


app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server started");
});
