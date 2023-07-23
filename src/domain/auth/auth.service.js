import bcrypt from 'bcrypt';
import UserModel from '../user/entity/User.js';
import TokenService from 'domain/token/token.service.js';
import validateRefreshToken from 'domain/token/handlers/validateRefreshToken.js';
import MailService from 'domain/mail/mail.service.js';
import { v4 } from 'uuid';

export default class AuthService {
    _tokenService = new TokenService();
    _mailService = new MailService();
    _defaultAvatar = '/uploads/noavatar.png';

    constructor() {}

    async register(req, res) {
        try {
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const phash = await bcrypt.hash(password, salt);
            const activationLink = v4();

            const doc = new UserModel({
                rank: 'user',
                email: req.body.email,
                fullName: req.body.fullName,
                avatarUrl: this._defaultAvatar,
                passwordHash: phash,
                activationLink,
            });

            const checkNewUserData = await UserModel.findOne({
                email: req.body.email,
            });

            if (checkNewUserData) {
                return res
                    .status(400)
                    .json({ message: 'Данная почта уже используется' });
            }

            const user = await doc.save();

            await this._mailService.sendActivationEmail(
                req.body.email,
                `${process.env.API_URL}/activate/${activationLink}`,
            );

            const tokens = this._tokenService.generateTokens({ id: user._id });

            await this._tokenService.save(user._id, tokens.refreshToken);

            res.cookie('refreshToken', tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            });

            const { passwordHash, ...userData } = user._doc;

            return res.status(200).json({
                userData,
                accessToken: tokens.accessToken,
                message:
                    'Успешная регистрация. Для активиции профиля перейдите по ссылке из письма',
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }

    async activate(req, res) {
        try {
            const user = await UserModel.findOne({
                activationLink: req.params.link,
            });

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'Пользователь не найден' });
            }

            user.isActivated = true;

            await user.save();

            return res.redirect(
                `${process.env.ORIGIN}/activate/${req.params.link}`,
            );
        } catch (error) {
            return res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }

    async login(req, res) {
        try {
            const user = await UserModel.findOne({ email: req.body.email });

            if (!user) {
                return res
                    .status(400)
                    .json({ message: 'Неверный логин или пароль!' });
            }

            if (!user.isActivated) {
                return res.status(400).json({
                    message:
                        'Аккаунт не активирован. Проверьте почтовый ящик и перейдите по ссылке из письма',
                });
            }

            const isValid = await bcrypt.compare(
                req.body.password,
                user._doc.passwordHash,
            );

            if (!isValid) {
                return res
                    .status(400)
                    .json({ message: 'Неверный логин или пароль!' });
            }

            const tokens = this._tokenService.generateTokens({ id: user._id });

            await this._tokenService.save(user._id, tokens.refreshToken);

            res.cookie('refreshToken', tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            });

            const { passwordHash, ...userData } = user._doc;

            return res
                .status(200)
                .json({ userData, accessToken: tokens.accessToken });
        } catch (error) {
            return res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }

    async logout(req, res) {
        try {
            const { refreshToken } = req.cookies;

            await this._tokenService.removeToken(refreshToken);

            res.clearCookie('refreshToken');

            return res
                .status(200)
                .json({ message: 'Пользователь успешно вышел из аккаунта' });
        } catch (error) {
            return res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }

    async refresh(req, res) {
        try {
            const { refreshToken } = req.cookies;

            if (!refreshToken) {
                throw new Error('Refresh token was not found');
            }

            const userData = validateRefreshToken(refreshToken);
            const tokenFromDb = this._tokenService.findToken(refreshToken);

            if (!userData || !tokenFromDb) {
                return res.status(403).json({ message: 'Нет доступа' });
            }

            const user = await UserModel.findById(userData.id);

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'Пользователь не найден' });
            }

            const tokens = this._tokenService.generateTokens({ id: user._id });

            await this._tokenService.save(user._id, tokens.refreshToken);

            res.cookie('refreshToken', tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            });

            return res.status(200).json({ accessToken: tokens.accessToken });
        } catch (error) {
            return res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }

    async getMe(req, res) {
        try {
            const user = await UserModel.findById(req.userId);

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'Пользователь не найден!' });
            }

            const { passwordHash, ...userData } = user._doc;

            return res.status(200).json({ userData });
        } catch (error) {
            return res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }
}
