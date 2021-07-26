const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const CommentModel = require("../models/Comments.model");

const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const UserModel = require("../models/User.model");

//Adicionar comentario (C)
router.post(
  "/:type/:contentId/comment",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { type, contentId } = req.params;
      const loggedInUser = req.currentUser;

      const newComment = await CommentModel.create({
        userId: loggedInUser._id,
        title: req.body.title,
        comment: req.body.comment,
      });
      return res.status(201).json(newComment);
    } catch (err) {
      next(err);
    }
  }
);

//Editar comentario (U)
router.put(
  "/:moveId/comment/:id",
  isAuthenticated,
  attachCurrentUser,

  async (req, res, next) => {
    try {
      const { id } = req.params;

      const updatedComment = await CommentModel.findOneAndUpdate(
        { _id: id },
        { $set: { ...req.body } },
        { new: true, runValidators: true }
      );

      if (updatedComment) {
        return res.status(200).json(updatedComment);
      }
      return res.status(400).json({ error: "Comentario não encontrado" });
    } catch (err) {
      next(err);
    }
  }
);

//Deletar um comentario (D)
router.delete(
  "/:moveId/comment/:id",
  isAuthenticated,
  attachCurrentUser,

  async (req, res, next) => {
    try {
      const { id } = req.params;

      const comment = await CommentModel.findOne({ _id: id });
      const deleteComment = await CommentModel.deleteOne({ _id: id });

      if (deletionResult.n > 0) {
        const updatedUser = await UserModel.findOneAndUpdate(
          { _id: userId.userComments },
          { $pull: { userComments: id } },
          { new: true }
        );

        if (updatedUser) {
          return res.status(200).json({});
        }
        return res
          .status(404)
          .json({
            error:
              "Não foi possível deletar o comentario, pois o usuario não foi encontrado.",
          });
      }
      return res.status(404).json({ error: "Comentario não encontrado" });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
