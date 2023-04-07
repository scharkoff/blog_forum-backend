import { body } from 'express-validator';

export const avatarValidation = [
    body('avatarUrl', 'Неверная ссылка на изображение!')
        .optional()
        .isString()
        .isLength({ min: 1 }),
];
