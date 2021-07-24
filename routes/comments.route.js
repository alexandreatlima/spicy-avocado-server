const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const CommentModel = require("../models/Comments.model");

const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

router.post(
  "/:moveId/comment",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { type } = req.body;
      const loggedInUser = req.currentUser;

      const newComment = await CommentModel.create({
        userId: loggedInUser._id,
        title: String,
        comment: String,
      });
      return res.satatus(201).json(newComment);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
