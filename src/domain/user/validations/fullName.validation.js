import { body } from "express-validator";

export const fullNameValidation = [
    body("fullName", "Имя не может состоять менее чем из 3 символов!").isLength({
        min: 3,
    })
]


