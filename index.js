// -- Плагины
import express from "express";
import mongoose from "mongoose";
import multer from "multer";

// -- CORS
import cors from "cors";

// -- Валидации
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
  fullNameValidation,
  passwordValidation,
  emailValidation,
  avatarValidation,
} from "./validations/validations.js";

// -- Контроллеры
import {
  register,
  login,
  getMe,
  updateUserLogin,
  updateUserEmail,
  updateUserPassword,
  updateUserAvatar,
  getUsers,
  deleteUser,
  updateUserRank,
} from "./controllers/UserController.js";
import {
  create,
  getAll,
  getOne,
  remove,
  update,
  getLastTags,
} from "./controllers/PostController.js";
import {
  addComment,
  getAllComments,
  removeComment,
  updateComment,
} from "./controllers/CommentController.js";

// -- Посредники
import checkAuth from "./utils/checkAuth.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";

// -- Подключене к БД
mongoose
  .connect(
    "mongodb+srv://admin:12345@cluster0.kalpivn.mongodb.net/blog?retryWrites=true"
  )
  .then(() => {
    console.log("Successful connection to the database");
  })
  .catch((err) => {
    console.log(err, "Connect error");
  });

// -- Express app
const app = express();
app.use(express.json());

// -- Отключение CORS чтобы не ругался
app.use(cors());

// -- Доступ к картинке
app.use("/uploads", express.static("uploads")); // -- GET запрос на получение статичного файла по его названию (с расширением)

// -- Multer storage
const storage = multer.diskStorage({
  destination: (__, _, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// -- Загрузить файл картинку
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  return res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

// -- Авторизация пользователей
app.post("/auth/login", loginValidation, handleValidationErrors, login);

// -- Регистрация пользователей
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  register
);

// -- === CRUD для пользателей: обновить информацию пользователя ===
// -- Обновить логин пользователя
app.patch(
  "/auth/updateUserLogin",
  checkAuth,
  fullNameValidation,
  handleValidationErrors,
  updateUserLogin
);

// -- Обновить почту пользователя
app.patch(
  "/auth/updateUserEmail",
  checkAuth,
  emailValidation,
  handleValidationErrors,
  updateUserEmail
);

// -- Обновить пароль пользователя
app.patch(
  "/auth/updateUserPassword",
  checkAuth,
  passwordValidation,
  handleValidationErrors,
  updateUserPassword
);

// -- Обновить аватар пользователя
app.patch(
  "/auth/updateUserAvatar",
  checkAuth,
  avatarValidation,
  handleValidationErrors,
  updateUserAvatar
);

// -- Обновить ранг пользователя
app.patch(
  "/auth/updateUserRank",
  checkAuth,
  handleValidationErrors,
  updateUserRank
);

// -- Получить информацию о профиле
app.get("/auth/me", checkAuth, getMe);

// -- === CRUD для комментариев ===
app.post(
  "/posts/:id/addComment",
  checkAuth,
  handleValidationErrors,
  addComment
); // -- создать комментарий

app.get("/posts/comments", getAllComments); // -- получить комментарии статьи
app.post(
  "/posts/:id/removeComment",
  checkAuth,
  handleValidationErrors,
  removeComment
); // -- удалить комментарий

app.patch(
  "/posts/:id/updateComment",
  checkAuth,
  handleValidationErrors,
  updateComment
);

// === -- CRUD для постов
app.post(
  "/posts/create",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  create
); // -- создать статью
app.get("/posts", getAll); // -- получить все статьи
app.get("/posts/:id", getOne); // -- получить одну статью по ее id
app.get("/posts/tags", getLastTags); // -- получить последние теги
app.delete("/posts/:id", checkAuth, remove); // -- удалить статью по ее id
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  update
); // -- обновить статью

app.get("/tags", getLastTags); // -- получить теги

// === -- CRUD для пользователей
app.get("/users", checkAuth, getUsers); // -- получить всех пользователей
app.delete("/users/delete/:id", checkAuth, deleteUser); // -- удалить пользователя

// -- Прослушка сервера
app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("server started");
});
