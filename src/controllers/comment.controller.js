import CommentModel from "../domain/comment/entity/Comment.js";
import PostModel from "../domain/post/entity/Post.js";

import { createResponse } from "../utils/createResponse.js";

export const getAllComments = async (req, res) => {
  try {
    const comments = await CommentModel.find()
      .populate("user")
      .populate("post")
      .exec();

    return createResponse(res, 200, "Комментарии успешно получены!", "success", { comments });
  } catch (error) {
    return createResponse(res, 500, "Не удалось получить комментарии. Что-то пошло не так!", "error", { error });
  }
};

export const addComment = async (req, res) => {
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
          return createResponse(res, 500, "Не удалось создать комментарий!", "error", { err });
        }
      }
    );

    const comment = await docComment.save();

    return createResponse(res, 200, "Комментарий успешно создан!", "success", { comment });
  } catch (error) {
    return createResponse(res, 500, "Не удалось создать комментарий. Что-то пошло не так!", "error", { error });
  }
};

export const removeComment = async (req, res) => {
  try {
    const commentId = req.body.commentId;

    PostModel.findByIdAndUpdate(
      req.body.post,
      { $inc: { commentsCount: -1 } },
      (err, doc) => {
        if (err) {
          return createResponse(res, 500, "Не удалось удалить комментарий. Что-то пошло не так!", "error", { err });
        }

        if (!doc) {
          return createResponse(res, 404, "Не удалось удалить комментарий. Запись не найдена!", "error");
        }
      }
    );

    CommentModel.findOneAndDelete(
      {
        _id: commentId,
      },
      (err, doc) => {
        if (!doc) {
          return createResponse(res, 404, "Не удалось удалить комментарий. Комментарий не найден!", "error");
        }

        if (err) {
          return createResponse(res, 500, "Не удалось удалить комментарий. Что-то пошло не так!", "error", { err });
        }

        return createResponse(res, 200, "Комментарий успешно удален!", "success");
      }
    );
  } catch (error) {
    return createResponse(res, 500, "Не удалось удалить комментарий. Что-то пошло не так!", "error", { error });
  }
};

export const updateComment = async (req, res) => {
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
          return createResponse(res, 404, "Не удалось изменить комментарий. Комментарий не найден!", "error");
        }

        if (err) {
          return createResponse(res, 500, "Не удалось изменить комментарий. Что-то пошло не так!", "error", { err });
        }
        return createResponse(res, 200, "Комментарий успешно изменен!", "success");
      }
    );
  } catch (error) {
    return createResponse(res, 500, "Не удалось удалить комментарий. Что-то пошло не так!", "error", { error });
  }
};
