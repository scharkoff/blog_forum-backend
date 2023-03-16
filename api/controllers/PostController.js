import PostModel from "../models/Post.js";
import CommentModel from "../models/Comment.js";
import mongoose from "mongoose";

import { createResponse } from "../utils/createResponse.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();

    return createResponse(res, 200, "Статьи успешно получены!", "success", { posts });
  } catch (error) {
    return createResponse(res, 500, "Не удалось получить статьи. Что-то пошло не так!", "error", { error });
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

    return createResponse(res, 200, "Тэги успешно получены!", "success", { fiveTags });
  } catch (error) {
    return createResponse(res, 500, "Не удалось получить тэги. Что-то пошло не так!", "error", { error });
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
      (err, post) => {
        if (err) {
          return createResponse(res, 500, "Не удалось получить статью!", "error", { err });
        }

        if (!post) {
          return createResponse(res, 404, "Статья не найдена!", "error");
        }

        return createResponse(res, 200, "Статья успешно получена!", "success", { post });
      }
    ).populate("user");
  } catch (error) {
    return createResponse(res, 500, "Не удалось получить статью. Что-то пошло не так!", "error", { error });
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
          return createResponse(res, 500, "Не удалось удалить статью!", "error", { err });
        }

        if (!doc) {
          return createResponse(res, 404, "Статья не найдена!", "error");
        }

        return createResponse(res, 200, "Статья успешно удалена!", "success");
      }
    );
  } catch (error) {
    return createResponse(res, 500, "Не удалось удалить статью. Что-то пошло не так!", "error", { error });
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

    return createResponse(res, 200, "Статья успешно создана!", "success", { post });
  } catch (error) {
    return createResponse(res, 500, "Не удалось создать статью. Что-то пошло не так!", "error", { error });
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

    return createResponse(res, 200, "Статья успешно изменена!", "success");
  } catch (error) {
    return createResponse(res, 500, "Не удалось обновить статью. Что-то пошло не так!", "error", { error });
  }
};
