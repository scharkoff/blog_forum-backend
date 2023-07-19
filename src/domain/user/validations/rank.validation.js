import { body } from 'express-validator';

const validateRank = (value) => {
    return value === 'user' || value === 'admin';
};

const rankValidation = [
    body('rank')
        .custom(validateRank)
        .withMessage('�������� ���� �� ��������� ��������: "user", "admin"'),
];

export default rankValidation;
