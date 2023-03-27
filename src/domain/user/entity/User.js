import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    rank: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },

    avatarUrl: String,
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

export default mongoose.model("User", UserSchema);
