const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const CommentModel = require("../models/Comments.model");

const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

// Rota de postar o comentario precisa ser post e put (para acrescentar o ID do comentário ao perfil do usuário)
router.post(
  "/:contentId/comment",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { contentId } = req.params;
      const loggedInUser = req.currentUser;

      const newComment = await CommentModel.create({
        title: String,
        comment: String,
        userId: loggedInUser._id,
        contentId: contentId,
      });
      return res.satatus(201).json(newComment);
    } catch (err) {
      next(err);
    }
  }
);

router.put("/:contentId/comment"),
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };

module.exports = router;
