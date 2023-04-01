import { body } from "express-validator";

export const loginValidation = [
    body("email", "Неверный формат почты!").isEmail(),
    body("password", "Длина пароля должна иметь минимум 5 символов!").isLength({
        min: 5,
    }),
];