import { body } from 'express-validator';

export const postCreateValidation = [
  body('title', 'Введите заголовок статьи! Минимальное кол-во символов: 3')
    .isLength({ min: 3 })
    .isString(),
  body('text', 'Введите текст статьи! Минимальное кол-во символов: 20')
    .isLength({ min: 20 })
    .isString(),
  body('tags', 'Неверный формат тегов!').optional().isArray(),
  body('imageUrl', 'Неверная ссылка на изображение!').optional().isString(),
];
