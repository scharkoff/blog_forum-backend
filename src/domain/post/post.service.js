import PostModel from './entity/Post.js';
import CommentModel from '../comment/entity/Comment.js';
import mongoose from 'mongoose';
import { createSortOptions } from './handlers/sorttype.handler.js';
import { createFilterOptions } from './handlers/filter.handler.js';

export class PostService {
    constructor() {}

    async findAll(req, res) {
        try {
            const posts = await PostModel.find().populate('user').exec();

            return res.status(200).json({ posts });
        } catch (error) {
            return res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }

    async findByPage(req, res) {
        try {
            const { page, pageSize, sortType, tag, searchText } = req.query;

            const skip = (page - 1) * pageSize;
            const limit = parseInt(pageSize);

            const tagValue = tag === 'null' ? null : tag;
            const searchValue = searchText === 'null' ? null : searchText;

            const sortOptions = createSortOptions(sortType);
            const filterOptions = createFilterOptions(searchValue, tagValue);

            const postsCount = await PostModel.countDocuments(
                filterOptions,
            ).exec();

            const posts = await PostModel.find(filterOptions)
                .sort(sortOptions)
                .populate('user')
                .skip(skip)
                .limit(limit)
                .exec();

            return res.status(200).json({ posts, postsCount });
        } catch (error) {
            return res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }

    async findOneById(req, res) {
        try {
            const postId = req.params.id;
            const comments = await CommentModel.find({
                post: mongoose.Types.ObjectId(postId),
            })
                .populate('user')
                .populate('post')
                .exec();

            PostModel.findOneAndUpdate(
                {
                    _id: mongoose.Types.ObjectId(postId),
                },
                {
                    $inc: { viewsCount: 1 },
                    commentsCount: comments.length,
                },
                {
                    returnDocument: 'after',
                },
                (err, post) => {
                    if (err) {
                        return res
                            .status(500)
                            .json({ message: 'Что-то пошло не так' });
                    }

                    if (!post) {
                        return res
                            .status(404)
                            .json({ message: 'Статья не найдена' });
                    }

                    return res.status(200).json({ post, comments });
                },
            ).populate('user');
        } catch (error) {
            return res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }

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
                        return res
                            .status(500)
                            .json({ message: 'Что-то пошло не так' });
                    }

                    if (!doc) {
                        return res
                            .status(404)
                            .json({ message: 'Статья не найдена' });
                    }

                    return res
                        .status(200)
                        .json({ message: 'Статья успешно удалена' });
                },
            );
        } catch (error) {
            return res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }

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

            return res.status(200).json({ post });
        } catch (error) {
            return res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }

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
                },
            );

            return res.status(200).json({ message: 'Статья успешно изменена' });
        } catch (error) {
            return res.status(500).json({ message: 'Что-то пошло не так' });
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

            return res.status(200).json({ lastTags });
        } catch (error) {
            return res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }
}
