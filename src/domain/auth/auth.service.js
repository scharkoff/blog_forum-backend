import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../user/entity/User.js';

const defaultAvatar = '../../../uploads/noavatar.png';

export class AuthService {
  constructor() { }

  async register(req, res) {
    try {
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const phash = await bcrypt.hash(password, salt);

      const doc = new UserModel({
        rank: 'user',
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: defaultAvatar,
        passwordHash: phash,
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

      const token = jwt.sign(
        {
          _id: user._id,
        },
        'secrethash123',
        {
          expiresIn: '30d',
        },
      );

      const { passwordHash, ...userData } = user._doc;

      return res.status(200).json({ userData, token });
    } catch (error) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }

  async login(req, res) {
    try {
      const user = await UserModel.findOne({ email: req.body.email });

      if (!user) {
        return res.status(400).json({ message: 'Неверный логин или пароль!' });
      }

      const isValid = await bcrypt.compare(
        req.body.password,
        user._doc.passwordHash,
      );

      if (!isValid) {
        return res.status(400).json({ message: 'Неверный логин или пароль!' });
      }

      const token = jwt.sign(
        {
          _id: user._id,
        },
        'secrethash123',
        {
          expiresIn: '30d',
        },
      );

      const { passwordHash, ...userData } = user._doc;

      return res.status(200).json({ userData, token });
    } catch (error) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }

  async getMe(req, res) {
    try {
      const user = await UserModel.findById(req.userId);

      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден!' });
      }

      const { passwordHash, ...userData } = user._doc;

      return res.status(200).json({ userData });
    } catch (error) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }
}
