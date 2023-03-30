import UserModel from "./entity/User.js";
import PostModel from "../post/entity/Post.js";
import CommentModel from "../comment/entity/Comment.js";
import mongoose from "mongoose";
import { handleFullNameUpdate } from "./handlers/fullName.handler.js";
import { handlePasswordUpdate } from "./handlers/password.handler.js";
import { handleEmailUpdate } from "./handlers/email.handler.js";
import { handleAvatarUpdate } from "./handlers/avatar.handler.js";
import { handleRankUpdate } from "./handlers/rank.handler.js";


export class UserService {
    constructor() { }

    async findAll(req, res) {
        try {
            const users = await UserModel.find().exec();

            return res.status(200).json({ users, statusCode: 200 })
        } catch (error) {
            return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
        }
    };

    async findOneById(req, res) {
        try {
            const userId = req.params.id;
            const user = await UserModel.findById({ _id: userId, }).exec();

            if (!user) {
                return res.status(404).json({ message: "Пользователь не найден", statusCode: 404 })
            }

            return res.status(200).json({ user, statusCode: 200 })

        } catch (error) {
            return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
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
                        return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
                    }

                    if (!doc) {
                        return res.status(404).json({ message: "Пользователь не найден", statusCode: 404 })
                    }

                    await CommentModel.find({
                        user: mongoose.Types.ObjectId(userId),
                    })
                        .deleteMany();


                    await PostModel.find({
                        user: mongoose.Types.ObjectId(userId),
                    })
                        .deleteMany();


                    return res.status(200).json({ message: "Пользователь успешно удален", statusCode: 200 });
                }
            );

        } catch (error) {
            return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
        }
    };

    async updateByCondition(req, res) {
        try {
            const id = mongoose.Types.ObjectId(req.body.id);

            if (req.body.fullName) {
                return handleFullNameUpdate({ id, fullName: req.body.fullName, res });
            }

            if (req.body.password) {
                return handlePasswordUpdate({ id, password: req.body.password, res })
            }

            if (req.body.email) {
                return handleEmailUpdate({ id, email: req.body.email, res })
            }

            if (req.body.avatarUrl) {
                return handleAvatarUpdate({ id, avatarUrl: req.body.avatarUrl, res })
            }

            if (req.body.rank) {
                return handleRankUpdate({ id, rank: req.body.rank, res })
            }

            return res.status(400).json({ message: "Неправильный формат запроса", statusCode: 400 })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
        }
    }
}