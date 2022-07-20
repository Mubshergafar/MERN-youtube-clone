import { verifyToken } from "../helpers/verifyToken.js";

import express from "express";
import {
  addComment,
  deleteComment,
  getComment,
} from "../controllers/comment.js";

const router = express.Router();

router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/:videoId", getComment);

export default router;
