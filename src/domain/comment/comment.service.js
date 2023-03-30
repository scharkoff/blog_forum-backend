import CommentModel from "./entity/Comment.js";
import PostModel from "../post/entity/Post.js";

export class CommentService {
    constructor() { }

    async findAll(req, res) {
        try {
            const comments = await CommentModel.find()
                .populate("user")
                .populate("post")
                .exec();

            return res.status(200).json({ comments, statusCode: 200 })
        } catch (error) {
            return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
        }
    };

    async findLasts(req, res) {
        try {
            let comments = await CommentModel.find()
                .populate("user")
                .populate("post")
                .exec();

            comments = comments.slice(0, 5).reverse();

            return res.status(200).json({ comments, statusCode: 200 })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
        }
    };

    async create(req, res) {
        try {
            const docComment = new CommentModel({
                text: req.body.text,
                user: req.userId,
                avatarUrl: req.body.avatarUrl,
                fullName: req.body.fullName,
                post: req.body.post,
            });

            PostModel.findByIdAndUpdate(
                req.body.post,
                { $inc: { commentsCount: 1 } },
                (err, doc) => {
                    if (err) {
                        return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
                    }

                    if (!doc) {
                        return res.status(404).json({ message: "Запись не найдена", statusCode: 404 })
                    }
                }
            );

            const comment = await docComment.save();

            return res.status(200).json({ comment, statusCode: 200 })
        } catch (error) {
            return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
        }
    };

    async delete(req, res) {
        try {
            const commentId = req.params.id;

            PostModel.findOneAndUpdate(
                commentId,
                { $inc: { commentsCount: -1 } },
                (err, doc) => {
                    if (err) {
                        return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
                    }

                    if (!doc) {
                        return res.status(404).json({ message: "Запись не найдена", statusCode: 404 })
                    }
                }
            );

            CommentModel.findOneAndDelete(
                {
                    _id: commentId,
                },
                (err, doc) => {
                    if (!doc) {
                        return res.status(404).json({ message: "Комментарий не найден", statusCode: 404 })
                    }

                    if (err) {
                        return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
                    }

                    return res.status(200).json({ message: "Комментарий успешно удален", statusCode: 200 })
                }
            );
        } catch (error) {
            return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
        }
    };

    async update(req, res) {
        try {
            const commentId = req.body.commentId;

            CommentModel.findOneAndUpdate(
                {
                    _id: commentId,
                },
                {
                    text: req.body.text,
                },
                (err, doc) => {
                    if (!doc) {
                        return res.status(404).json({ message: "Комментарий не найден", statusCode: 404 })
                    }

                    if (err) {
                        return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
                    }

                    return res.status(200).json({ message: "Комментарий успешно изменен", statusCode: 200 })
                }
            );
        } catch (error) {
            return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
        }
    };

}