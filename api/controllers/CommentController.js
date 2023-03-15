import CommentModel from "../models/Comment.js";
import PostModel from "../models/Post.js";

export const getAllComments = async (req, res) => {
  try {
    const comments = await CommentModel.find()
      .populate("user")
      .populate("post")
      .exec();

    return res.json(comments);
  } catch (error) {
    return res.status(500).json({
      message: "Не удалось получить комментарии!",
    });
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
          return res.status(500).json({
            message: "Не удалось создать комментарий!",
          });
        }
      }
    );

    const comment = await docComment.save();
    return res.json(comment);
  } catch (error) {
    return res.status(500).json({
      message: "Не удалось создать комментарий!",
    });
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
          console.log(err);
          return res.status(500).json({
            message: "Не удалось удалить комментарий!",
          });
        }
      }
    );

    CommentModel.findOneAndDelete(
      {
        _id: commentId,
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            message: "Не удалось удалить комментарий!",
          });
        }
        return res.json({
          success: true,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      message: "Не удалось удалить комментарий!",
    });
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
        if (err) {
          return res.status(500).json({
            message: "Не удалось изменить комментарий!",
          });
        }
        return res.json({
          success: true,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      message: "Не удалось изменить комментарий!",
    });
  }
};
