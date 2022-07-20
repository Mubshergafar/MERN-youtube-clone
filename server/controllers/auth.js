import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { createError } from "../error.js";

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    // console.log(newUser);
    res.status(200).json({ message: "User created" });
  } catch (error) {
    next(createError(400, error.message));
  }
};

// signin
export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const isMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!isMatch) {
      return next(createError(400, "Wroong credentials"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const { password, ...other } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  } catch (error) {
    next(createError(400, error.message));
  }
};

// google login
export const googleLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User signed in" });
  } catch (error) {
    next(createError(400, error.message));
  }
};
