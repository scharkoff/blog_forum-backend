import { body } from 'express-validator';

const passwordValidation = [
    body('password', 'Длина пароля должна иметь минимум 5 символов!').isLength({
        min: 5,
    }),
];

export default passwordValidation;
