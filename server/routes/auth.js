import express from "express";

const router = express.Router();

//Create a user
router.post("/signup");

//Login a user
router.post("/signin");

//Google login
router.post("/google");

export default router;
