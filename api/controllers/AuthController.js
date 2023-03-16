import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../models/User.js";

import { createResponse } from "../utils/createResponse.js";

const defaultAvatar = "/uploads/noavatar.png";

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const phash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            rank: req.body.rank,
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: defaultAvatar,
            passwordHash: phash,
        });

        const checkNewUserData = await UserModel.findOne({ email: req.body.email });
        if (checkNewUserData) {
            return createResponse(res, 400, "Данная почта уже используется!", "error");
        }

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            "secrethash123",
            {
                expiresIn: "30d",
            }
        );

        const { passwordHash, ...userData } = user._doc;

        return createResponse(res, 200, "Регистрация прошла успешно!", "success", { userData, token });
    } catch (error) {
        return createResponse(res, 500, "Не удалось зарегистрироваться. Что-то пошло не так!", "error", { error });
    }
};


export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return createResponse(res, 400, "Неверный логин или пароль!", "error");
        }

        const isValid = await bcrypt.compare(
            req.body.password,
            user._doc.passwordHash
        );

        if (!isValid) {
            return createResponse(res, 400, "Неверный логин или пароль!", "error");
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            "secrethash123",
            {
                expiresIn: "30d",
            }
        );

        const { passwordHash, ...userData } = user._doc;

        return createResponse(res, 200, "Авторизация прошла успешно!", "success", { userData, token });
    } catch (error) {
        console.log(error)
        return createResponse(res, 500, "Не удалось авторизоваться. Что-то пошло не так!", "error", { error });
    }
};


export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return createResponse(res, 404, "Пользователь не найден!", "error");
        }

        const { passwordHash, ...userData } = user._doc;

        return createResponse(res, 200, "Авторизация прошла успешно!", "success", { userData });
    } catch (error) {
        return createResponse(res, 500, "Не удалось провести идентификацию. Что-то пошло не так!", "error", { error });
    }
};