import { body } from "express-validator";


export const loginValidation = [
  body("email", "Неверный формат почты!").isEmail(),
  body("password", "Длина пароля должна иметь минимум 5 символов!").isLength({
    min: 5,
  }),
];


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


export const emailValidation = [
  body("email", "Неверный формат почты!").isEmail(),
];


export const passwordValidation = [
  body("password", "Длина пароля должна иметь минимум 5 символов!").isLength({
    min: 5,
  }),
];


export const fullNameValidation = [
  body("fullName", "Имя не может состоять менее чем из 3 символов!").isLength({
    min: 3,
  }),
];


export const avatarValidation = [
  body("avatarUrl", "Неверная ссылка на изображение!")
    .optional()
    .isString()
    .isLength({ min: 1 }),
];


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
