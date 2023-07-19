import mongoose from 'mongoose';
import UserModel from 'domain/user/entity/User.js';
import PostModel from 'domain/post/entity/Post.js';
import CommentModel from 'domain/comment/entity/Comment.js';
import handleFullNameUpdate from './handlers/fullName.handler.js';
import handlePasswordUpdate from './handlers/password.handler.js';
import handleEmailUpdate from './handlers/email.handler.js';
import handleAvatarUpdate from './handlers/avatar.handler.js';
import handleRankUpdate from './handlers/rank.handler.js';

export class UserService {
    constructor() {}

    async findAll(req, res) {
        try {
            const users = await UserModel.find().exec();

            return res.status(200).json({ users });
        } catch (error) {
            return res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }

    async findOneById(req, res) {
        try {
            const userId = req.params.id;
            const user = await UserModel.findById({
                _id: mongoose.Types.ObjectId(userId),
            }).exec();

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'Пользователь не найден' });
            }

            return res.status(200).json({ user });
        } catch (error) {
            return res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }

    async delete(req, res) {
        try {
            const userId = req.params.id;

            UserModel.findOneAndDelete(
                {
                    _id: mongoose.Types.ObjectId(userId),
                },
                async (err, doc) => {
                    if (err) {
                        return res
                            .status(500)
                            .json({ message: 'Что-то пошло не так' });
                    }

                    if (!doc) {
                        return res
                            .status(404)
                            .json({ message: 'Пользователь не найден' });
                    }

                    await CommentModel.find({
                        user: mongoose.Types.ObjectId(userId),
                    }).deleteMany();

                    await PostModel.find({
                        user: mongoose.Types.ObjectId(userId),
                    }).deleteMany();

                    return res
                        .status(200)
                        .json({ message: 'Пользователь успешно удален' });
                },
            );
        } catch (error) {
            return res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }

    async updateByCondition(req, res) {
        try {
            const userId = mongoose.Types.ObjectId(req.body.id);

            if (req.body.fullName) {
                return handleFullNameUpdate({
                    userId,
                    fullName: req.body.fullName,
                    res,
                });
            }

            if (req.body.password) {
                return handlePasswordUpdate({
                    userId,
                    password: req.body.password,
                    res,
                });
            }

            if (req.body.email) {
                return handleEmailUpdate({
                    userId,
                    email: req.body.email,
                    res,
                });
            }

            if (req.body.avatarUrl) {
                return handleAvatarUpdate({
                    userId,
                    avatarUrl: req.body.avatarUrl,
                    res,
                });
            }

            if (req.body.rank) {
                return handleRankUpdate({ userId, rank: req.body.rank, res });
            }

            return res
                .status(400)
                .json({ message: 'Неправильный формат запроса' });
        } catch (error) {
            return res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }
}
