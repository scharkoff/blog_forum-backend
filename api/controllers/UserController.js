import bcrypt from "bcrypt";

import mongoose from "mongoose";

import UserModel from "../models/User.js";
import PostModel from "../models/Post.js";
import CommentModel from "../models/Comment.js";

import { createResponse } from "../utils/createResponse.js";


export const updateUserLogin = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.body.id, {
      fullName: req.body.fullName,
    });


    if (!user) {
      return createResponse(res, 404, "Пользователь не найден!", "error");
    }

    const { ...userData } = user._doc;

    return createResponse(res, 200, "Логин успешно изменен!", "success", { userData });
  } catch (error) {
    return createResponse(res, 500, "Не удалось изменить логин. Что-то пошло не так!", "error", { error });
  }
};


export const updateUserPassword = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const phash = await bcrypt.hash(password, salt);

    const user = await UserModel.findByIdAndUpdate(req.body.id, {
      passwordHash: phash,
    });

    if (!user) {
      return createResponse(res, 404, "Пользователь не найден!", "error");
    }

    const { passwordHash, ...userData } = user._doc;

    return createResponse(res, 200, "Пароль успешно изменен!", "success", { userData });
  } catch (error) {
    return createResponse(res, 500, "Не удалось изменить пароль. Что-то пошло не так!", "error", { error });
  }
};


export const updateUserEmail = async (req, res) => {
  try {
    const checkNewUserEmail = await UserModel.findOne({ email: req.body.email });
    if (checkNewUserEmail) {
      return createResponse(res, 400, "Данная почта уже используется!", "error");
    }

    const user = await UserModel.findByIdAndUpdate(req.body.id, {
      email: req.body.email,
    });

    if (!user) {
      return createResponse(res, 404, "Пользователь не найден!", "error");
    }

    const { ...userData } = user._doc;

    return createResponse(res, 200, "Почта успешно изменена!", "success", { userData });
  } catch (error) {
    return createResponse(res, 500, "Не удалось изменить почту. Что-то пошло не так!", "error", { error });
  }
};


export const updateUserAvatar = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.body.id, {
      avatarUrl: req.body.avatarUrl,
    });

    if (!user) {
      return createResponse(res, 404, "Пользователь не найден!", "error");
    }

    const { ...userData } = user._doc;

    return createResponse(res, 200, "Аватар успешно изменен!", "success", { userData });
  } catch (error) {
    return createResponse(res, 500, "Не удалось изменить аватар. Что-то пошло не так!", "error", { error });
  }
};


export const updateUserRank = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.body.id, {
      rank: req.body.rank,
    });

    if (!user) {
      return createResponse(res, 404, "Пользователь не найден!", "error");
    }

    const { ...userData } = user._doc;

    return createResponse(res, 200, "Ранг успешно изменен!", "success", { userData });
  } catch (error) {
    return createResponse(res, 500, "Что-то пошло не так!", "error", { error });
  }
};


export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().exec();

    return createResponse(res, 200, "Пользователи успешно получены!", "success", { users });
  } catch (error) {
    return createResponse(res, 500, "Не удалось получить пользователей. Что-то пошло не так!", "error", { error });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    UserModel.findOneAndDelete(
      {
        _id: userId,
      },
      (err, doc) => {
        if (err) {
          return createResponse(res, 500, "Не удалось удалить пользователя!", "error", { err });
        }

        if (!doc) {
          return createResponse(res, 404, "Пользователь не найден!", "error");
        }

        return createResponse(res, 200, "Пользователь успешно удален!", "success");
      }
    );


    await CommentModel.find({
      user: mongoose.Types.ObjectId(userId),
    })
      .deleteMany()
      .exec();


    await PostModel.find({
      user: mongoose.Types.ObjectId(userId),
    })
      .deleteMany()
      .exec();
  } catch (error) {
    return createResponse(res, 500, "Не удалось удалить пользователя. Что-то пошло не так!", "error", { error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    UserModel.findById(
      {
        _id: userId,
      },
      (err, doc) => {
        if (err) {
          return createResponse(res, 500, "Не удалось получить пользователя!", "error", { err });
        }

        if (!doc) {
          return createResponse(res, 404, "Пользователь не найден!", "error");
        }

        return createResponse(res, 200, "Пользователь успешно найден!", "success");
      }
    );

  } catch (error) {
    return createResponse(res, 500, "Не удалось получить пользователя. Что-то пошло не так!", "error", { error });
  }
};

