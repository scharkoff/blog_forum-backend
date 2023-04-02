import PostModel from "./entity/Post.js";
import CommentModel from "../comment/entity/Comment.js";
import mongoose from "mongoose";


export class PostService {
    constructor() { }

    async findAll(req, res) {
        try {
            const posts = await PostModel.find().populate("user").exec();

            return res.status(200).json({ posts, statusCode: 200 })
        } catch (error) {
            return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
        }
    };

    async findByPage(req, res) {
        try {
            const { page, pageSize, sortType } = req.query;
            const skip = (page - 1) * pageSize;
            const limit = parseInt(pageSize);

            console.log(page, pageSize, sortType)

            const postsCount = await PostModel.countDocuments().exec();

            const sortOptions = {};

            if (sortType === "new") {
                sortOptions.createdAt = -1;
            }

            if (sortType === "popular") {
                sortOptions.viewsCount = -1;
            }

            const posts = await PostModel.find()
                .sort(sortOptions)
                .populate("user")
                .skip(skip)
                .limit(limit)
                .exec();

            return res.status(200).json({ posts, postsCount, statusCode: 200 })
        } catch (error) {
            return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
        }
    }

    async findByPageLikeTag(req, res) {
        try {
            const { page, pageSize, sortType } = req.query;
            const tag = req.params.id;
            console.log("tag", tag)
            const skip = (page - 1) * pageSize;
            const limit = parseInt(pageSize);

            console.log(page, pageSize, sortType)

            const sortOptions = {};

            if (sortType === "new") {
                sortOptions.createdAt = -1;
            }

            if (sortType === "popular") {
                sortOptions.viewsCount = -1;
            }

            console.log(sortOptions)

            const postsCount = await PostModel.countDocuments().exec();

            const posts = await PostModel.find({ tags: tag })
                .sort(sortOptions)
                .populate("user")
                .skip(skip)
                .limit(limit)
                .exec();

            return res.status(200).json({ posts, postsCount, statusCode: 200 })
        } catch (error) {
            return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
        }
    }

    async getLastTags(req, res) {
        try {
            const posts = await PostModel.find().exec();

            const tags = posts
                .reverse()
                .map((obj) => obj.tags)
                .flat()
                .filter((tag) => tag);


            const lastTags = [...new Set(tags)].slice(0, 5);

            return res.status(200).json({ lastTags, statusCode: 200 })
        } catch (error) {
            return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
        }
    };

    async findOneById(req, res) {
        try {
            const postId = req.params.id;
            const comments = await CommentModel.find({
                post: mongoose.Types.ObjectId(postId),
            });

            PostModel.findOneAndUpdate(
                {
                    _id: mongoose.Types.ObjectId(postId),
                },
                {
                    $inc: { viewsCount: 1 },
                    commentsCount: comments.length,
                },
                {
                    returnDocument: "after",
                },
                (err, post) => {
                    if (err) {
                        return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
                    }

                    if (!post) {
                        return res.status(404).json({ message: "Статья не найдена", statusCode: 404 })
                    }

                    return res.status(200).json({ post, statusCode: 200 })
                }
            ).populate("user");
        } catch (error) {
            return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
        }
    };

    async remove(req, res) {
        try {
            const postId = req.params.id;

            await CommentModel.find({
                post: mongoose.Types.ObjectId(postId),
            })
                .deleteMany()
                .exec();

            PostModel.findOneAndDelete(
                {
                    _id: mongoose.Types.ObjectId(postId),
                },
                (err, doc) => {
                    if (err) {
                        return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
                    }

                    if (!doc) {
                        return res.status(404).json({ message: "Статья не найдена", statusCode: 404 })
                    }

                    return res.status(200).json({ message: "Статья успешно удалена", statusCode: 200 })
                }
            );
        } catch (error) {
            return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
        }
    };

    async create(req, res) {
        try {
            const doc = new PostModel({
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                user: req.userId,
            });

            const post = await doc.save();

            return res.status(200).json({ post, statusCode: 200 })
        } catch (error) {
            return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
        }
    };

    async update(req, res) {
        try {
            const postId = req.params.id;


            await PostModel.findOneAndUpdate(
                {
                    _id: mongoose.Types.ObjectId(postId),
                },
                {
                    title: req.body.title,
                    text: req.body.text,
                    imageUrl: req.body.imageUrl,
                    tags: req.body.tags,
                    user: req.body.user,
                }
            );

            return res.status(200).json({ message: "Статья успешно изменена", statusCode: 200 })
        } catch (error) {
            return res.status(500).json({ message: "Что-то пошло не так", statusCode: 500 });
        }
    };
}