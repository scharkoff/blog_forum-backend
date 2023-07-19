import { body } from 'express-validator';

const validateRank = (value) => {
    return value === 'user' || value === 'admin';
};

const rankValidation = [
    body('rank')
        .custom(validateRank)
        .withMessage('¬ыберите одно из следующих значений: "user", "admin"'),
];

export default rankValidation;
