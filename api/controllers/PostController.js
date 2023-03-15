import PostModel from "../models/Post.js";
import CommentModel from "../models/Comment.js";
import mongoose from "mongoose";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();

    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Не удалось получить статьи!",
    });
  }
};

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().exec();

    const tags = posts
      .reverse()
      .map((obj) => obj.tags)
      .flat()
      .filter((tag) => tag);


    const fiveTags = [...new Set(tags)].slice(0, 5);

    return res.json(fiveTags);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Не удалось получить статьи!",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await CommentModel.find({
      post: mongoose.Types.ObjectId(postId),
    });

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
        commentsCount: comments.length,
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          console.log(error);
          return res.status(500).json({
            message: "Не удалось получить статьи!",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Статья не найдена!",
          });
        }

        return res.json(doc);
      }
    ).populate("user");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Не удалось получить статьи!",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    await CommentModel.find({
      post: mongoose.Types.ObjectId(postId),
    })
      .deleteMany()
      .exec();

    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(error);
          return res.status(500).json({
            message: "Не удалось удалить статью!",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Статья не найдена!",
          });
        }

        return res.json({
          success: true,
        });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Не удалось получить статьи!",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();
    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Не удалось создать статью!",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;


    await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.body.user,
      }
    );

    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Не удалось обновить статью!",
    });
  }
};
