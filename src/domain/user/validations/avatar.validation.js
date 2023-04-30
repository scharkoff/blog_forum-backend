import { body } from 'express-validator';

const avatarValidation = [
    body('avatarUrl', 'Неверная ссылка на изображение!')
        .optional()
        .isString()
        .isLength({ min: 1 }),
];

export default avatarValidation;
