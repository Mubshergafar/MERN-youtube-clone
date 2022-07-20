import { createError } from "../error.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

//add coment
export const addComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    next(error);
  }
};

// delete comment
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return next(createError(404, "Comment not found"));
    }
    if (req.user.id === comment.userId || req.user.id === Video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Comment deleted" });
    } else {
      return next(
        createError(403, "You are not authorized to delete this comment")
      );
    }
  } catch (error) {
    next(error);
  }
};

// get all comments
export const getComment = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
