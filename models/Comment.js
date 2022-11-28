import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    avatarUrl: {
      type: String,
    },
  },

  {
    timestamps: true,
  },
  {
    writeConcern: {
      j: true,
      wtimeout: 1000,
    },
  }
);

export default mongoose.model("Comment", CommentSchema);
