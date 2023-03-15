
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


import UserModel from "../models/User.js";
import PostModel from "../models/Post.js";
import CommentModel from "../models/Comment.js";


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
      return res.status(400).json({
        message: "Данный аккаунт уже зарегистрирован!",
      });
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

    return res.json({
      userData,
      token,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Не удалось зарегистрироваться!",
      error,
    });
  }
};


export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        message: "Неверный логин или пароль!",
      });
    }

    const isValid = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValid) {
      return res.status(400).json({
        message: "Неверный логин или пароль!",
      });
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

    return res.json({
      userData,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Не удалось авторизоваться!",
      error,
    });
  }
};


export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден!",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    return res.json(userData);
  } catch (error) {
    return res.status(500).json({
      message: "Что-то пошло не так!",
      error,
    });
  }
};


export const updateUserLogin = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.body.id, {
      fullName: req.body.fullName,
    });


    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден!",
      });
    }

    const { ...userData } = user._doc;

    return res.json({
      userData,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Что-то пошло не так!",
      error,
    });
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
      return res.status(404).json({
        message: "Пользователь не найден!",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    return res.json({
      userData,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Что-то пошло не так!",
      error,
    });
  }
};


export const updateUserEmail = async (req, res) => {
  try {
    const checkNewUserEmail = await UserModel.findOne({ email: req.body.email });
    if (checkNewUserEmail) {
      return res.status(400).json({
        message: "Данный аккаунт уже зарегистрирован!",
      });
    }

    const user = await UserModel.findByIdAndUpdate(req.body.id, {
      email: req.body.email,
    });

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден!",
      });
    }

    const { ...userData } = user._doc;

    return res.json({
      userData,
      success: true,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Что-то пошло не так!",
      error,
    });
  }
};


export const updateUserAvatar = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.body.id, {
      avatarUrl: req.body.avatarUrl,
    });

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден!",
      });
    }

    const { ...userData } = user._doc;

    return res.json({
      userData,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Что-то пошло не так!",
      error,
    });
  }
};


export const updateUserRank = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.body.id, {
      rank: req.body.rank,
    });

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден!",
      });
    }

    const { ...userData } = user._doc;

    return res.json({
      userData,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Что-то пошло не так!",
      error,
    });
  }
};


export const getUsers = async (req, res) => {
  try {
    const userList = await UserModel.find().exec();

    return res.json(userList);
  } catch (error) {
    return res.status(400).json({
      message: "Что-то пошло не так!",
    });
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
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Не удалось удалить пользователя!",
          });
        }

        if (!doc) {
          return res.status(404).json({
            success: false,
            message: "Пользователь не найден!",
          });
        }

        return res.json({
          success: true,
          message: "Пользователь успешно удален",
        });
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
    return res.status(400).json({
      success: false,
      message: "Что-то пошло не так!",
    });
  }
};
