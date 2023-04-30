import CommentModel from './entity/Comment.js';
import PostModel from '../post/entity/Post.js';
import mongoose from 'mongoose';

export default class CommentService {
    constructor() {}

    async findAll(req, res) {
        try {
            const comments = await CommentModel.find()
                .populate('user')
                .populate('post')
                .exec();

            return res.status(200).json({ comments });
        } catch (error) {
            return res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }

    async findLasts(req, res) {
        try {
            let comments = await CommentModel.find()
                .populate('user')
                .populate('post')
                .exec();

            comments = comments.slice(0, 5).reverse();

            return res.status(200).json({ comments });
        } catch (error) {
            return res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }

    async create(req, res) {
        try {
            const doc = new CommentModel({
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
                        return res
                            .status(500)
                            .json({ message: 'Что-то пошло не так' });
                    }

                    if (!doc) {
                        return res
                            .status(404)
                            .json({ message: 'Запись не найдена' });
                    }
                },
            );

            const newComment = await doc.save();

            const comment = await CommentModel.populate(newComment, {
                path: 'user',
            });

            return res.status(200).json({ comment });
        } catch (error) {
            return res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }

    async delete(req, res) {
        try {
            const commentId = mongoose.Types.ObjectId(req.params.id);

            PostModel.findOneAndUpdate(
                commentId,
                { $inc: { commentsCount: -1 } },
                (err, doc) => {
                    if (err) {
                        return res
                            .status(500)
                            .json({ message: 'Что-то пошло не так' });
                    }

                    if (!doc) {
                        return res
                            .status(404)
                            .json({ message: 'Запись не найдена' });
                    }
                },
            );

            CommentModel.findOneAndDelete(
                {
                    _id: commentId,
                },
                (err, doc) => {
                    if (!doc) {
                        return res
                            .status(404)
                            .json({ message: 'Комментарий не найден' });
                    }

                    if (err) {
                        return res
                            .status(500)
                            .json({ message: 'Что-то пошло не так' });
                    }

                    return res
                        .status(200)
                        .json({ message: 'Комментарий успешно удален' });
                },
            );
        } catch (error) {
            return res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }

    async update(req, res) {
        try {
            const commentId = mongoose.Types.ObjectId(req.body.commentId);

            const comment = await CommentModel.findOneAndUpdate(
                {
                    _id: commentId,
                },
                {
                    text: req.body.text,
                },
                {
                    new: true,
                },
            )
                .populate('user')
                .populate('post')
                .exec();

            if (!comment) {
                return res
                    .status(404)
                    .json({ message: 'Комментарий не найден' });
            }

            return res.status(200).json({ comment });
        } catch (error) {
            return res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }
}
