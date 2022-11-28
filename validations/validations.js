import { body } from "express-validator";

// -- Валидация для авторизации
export const loginValidation = [
  body("email", "Неверный формат почты!").isEmail(),
  body("password", "Длина пароля должна иметь минимум 5 символов!").isLength({
    min: 5,
  }),
];

// -- Валидация для регистрации
export const registerValidation = [
  body("email", "Неверный формат почты!").isEmail(),
  body("password", "Длина пароля должна иметь минимум 5 символов!").isLength({
    min: 5,
  }),
  body("fullName", "Имя не может состоять менее чем из 3 символов!").isLength({
    min: 3,
  }),
  body("avatarUrl", "Неверная ссылка!").optional().isURL(),
];

// -- Валидация для почты
export const emailValidation = [
  body("email", "Неверный формат почты!").isEmail(),
];

// -- Валидация для пароля
export const passwordValidation = [
  body("password", "Длина пароля должна иметь минимум 5 символов!").isLength({
    min: 5,
  }),
];

// -- Валидация для логина
export const fullNameValidation = [
  body("fullName", "Имя не может состоять менее чем из 3 символов!").isLength({
    min: 3,
  }),
];

// -- Валидация для аватара
export const avatarValidation = [
  body("avatarUrl", "Неверная ссылка на изображение!")
    .optional()
    .isString()
    .isLength({ min: 1 }),
];

// -- Валидация для создания поста
export const postCreateValidation = [
  body("title", "Введите заголовок статьи! Минимальное кол-во символов: 3")
    .isLength({ min: 3 })
    .isString(),
  body("text", "Введите текст статьи! Минимальное кол-во символов: 20")
    .isLength({ min: 20 })
    .isString(),
  body("tags", "Неверный формат тегов!").optional().isArray(),
  body("imageUrl", "Неверная ссылка на изображение!").optional().isString(),
];
