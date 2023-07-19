import avatarValidation from 'domain/user/validations/avatar.validation.js';
import emailValidation from 'domain/user/validations/email.validation.js';
import fullNameValidation from 'domain/user/validations/fullName.validation.js';
import passwordValidation from 'domain/user/validations/password.validation.js';
import rankValidation from 'domain/user/validations/rank.validation';

export default function userUpdateValidation(req, res, next) {
    if (req.body.fullName) {
        return Promise.all(
            fullNameValidation.map((rule) => rule.run(req)),
        ).finally(() => {
            next();
        });
    }

    if (req.body.email) {
        return Promise.all(
            emailValidation.map((rule) => rule.run(req)),
        ).finally(() => {
            next();
        });
    }

    if (req.body.password) {
        return Promise.all(
            passwordValidation.map((rule) => rule.run(req)),
        ).finally(() => {
            next();
        });
    }

    if (req.body.avatarUrl) {
        return Promise.all(
            avatarValidation.map((rule) => rule.run(req)),
        ).finally(() => {
            next();
        });
    }

    if (req.body.rank) {
        return Promise.all(rankValidation.map((rule) => rule.run(req))).finally(
            () => {
                next();
            },
        );
    }

    return res.status(400).json({ message: 'Неправильный формат запроса' });
}
