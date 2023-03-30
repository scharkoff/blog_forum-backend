import UserModel from "./entity/User.js";
import PostModel from "../post/entity/Post.js";
import CommentModel from "../comment/entity/Comment.js";
import mongoose from "mongoose";


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
            console.log(error)
            return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
        }
    };

    async updateUserLogin(req, res) {
        try {
            const user = await UserModel.findByIdAndUpdate(req.body.id, {
                fullName: req.body.fullName,
            });


            if (!user) {
                return res.status(404).json({ message: "Пользователь не найден", statusCode: 404 })
            }

            const { ...userData } = user._doc;

            return res.status(200).json({ userData, statusCode: 200 })
        } catch (error) {
            return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
        }
    };

    async updateUserPassword(req, res) {
        try {
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const phash = await bcrypt.hash(password, salt);

            const user = await UserModel.findByIdAndUpdate(req.body.id, {
                passwordHash: phash,
            });

            if (!user) {
                return res.status(404).json({ message: "Пользователь не найден", statusCode: 404 })
            }

            const { passwordHash, ...userData } = user._doc;

            return res.status(200).json({ userData, statusCode: 200 })
        } catch (error) {
            return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
        }
    };

    async updateUserEmail(req, res) {
        try {
            const checkNewUserEmail = await UserModel.findOne({ email: req.body.email });
            if (checkNewUserEmail) {
                return res.status(400).json({ message: "Данная почта уже используется!", statusCode: 400 })
            }

            const user = await UserModel.findByIdAndUpdate(req.body.id, {
                email: req.body.email,
            });

            if (!user) {
                return res.status(404).json({ message: "Пользователь не найден", statusCode: 404 })
            }

            const { ...userData } = user._doc;

            return res.status(200).json({ userData, statusCode: 200 })
        } catch (error) {
            return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
        }
    };


    async updateUserAvatar(req, res) {
        try {
            const user = await UserModel.findByIdAndUpdate(req.body.id, {
                avatarUrl: req.body.avatarUrl,
            });

            if (!user) {
                return res.status(404).json({ message: "Пользователь не найден", statusCode: 404 })
            }

            const { ...userData } = user._doc;

            return res.status(200).json({ userData, statusCode: 200 })
        } catch (error) {
            return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
        }
    };


    async updateUserRank(req, res) {
        try {
            const user = await UserModel.findByIdAndUpdate(req.body.id, {
                rank: req.body.rank,
            });

            if (!user) {
                return res.status(404).json({ message: "Пользователь не найден", statusCode: 404 })
            }

            const { ...userData } = user._doc;

            return res.status(200).json({ userData, statusCode: 200 })
        } catch (error) {
            return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
        }
    };


}
