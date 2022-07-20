import express from "express";
import {
  createVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  viewVideo,
  trendingVideos,
  randomVideos,
  subVideos,
  getByTag,
  search,
} from "../controllers/video.js";
import { verifyToken } from "../helpers/verifyToken.js";

const router = express.Router();

// create video
router.post("/", verifyToken, createVideo);

//update video
router.put("/:id", verifyToken, updateVideo);

//delete video
router.delete("/:id", verifyToken, deleteVideo);

//find video
router.get("/find/:id", getVideo);

//view video
router.put("/view/:id", viewVideo);

//get trending videos
router.get("/trend", trendingVideos);

//get random videos
router.get("/random", randomVideos);

//subscribe videos
router.get("/sub", verifyToken, subVideos);

//get video by tags
router.get("/tags", getByTag);

//get vedios by title (search)
router.get("/search", search);

export default router;
