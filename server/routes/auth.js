import express from "express";
import { signup, signin } from "../controllers/auth.js";

const router = express.Router();

//Create a user
router.post("/signup", signup);

//Login a user
router.post("/signin", signin);

//Google login
router.post("/google");

export default router;
