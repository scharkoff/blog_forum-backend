import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Неверный формат почты!').isEmail(),
  body('password', 'Длина пароля должна иметь минимум 5 символов!').isLength({
    min: 5,
  }),
  body('fullName', 'Имя не может состоять менее чем из 3 символов!').isLength({
    min: 3,
  }),
  body('avatarUrl', 'Неверная ссылка!').optional().isURL(),
];
