import { body } from 'express-validator';

const emailValidation = [body('email', 'Неверный формат почты!').isEmail()];

export default emailValidation;
