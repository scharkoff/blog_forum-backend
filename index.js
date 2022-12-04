// -- Плагины
import express from "express";

// -- CORS
import cors from "cors";

// -- Теги
import { getLastTags } from "./controllers/PostController.js";

// -- CRUDs
import { auth } from "./cruds/auth.js";
import { users } from "./cruds/users.js";
import { comments } from "./cruds/comments.js";
import { posts } from "./cruds/posts.js";

// -- Utils
import { multerUploads } from "./utils/multer.js";
import responseHeaders from "./utils/responseHeaders.js";

// -- Подключение к БД
import { getConnection } from "./config.js";
getConnection();

// -- Express app
export const app = express();
app.use(express.json());
app.use(cors({ origin: "https://sharkov-blog.onrender.com" }));

// -- Загрузка картинок (multer)
multerUploads();

// -- Авторазиция и регистрация в приложении
auth();

// -- CRUD для пользователей (админка)
users();

// -- CRUD для комментариев
comments();

// -- CRUD для постов
posts();

// -- Получить последние 5 тегов
app.get("/tags", responseHeaders, getLastTags);

// -- Прослушка сервера
app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server started");
});
