const express = require("express");
const router = express.Router();

const CommentModel = require("../models/Comments.model");
const UserModel = require("../models/User.model");

const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

//Adicionar comentario (C)
router.post(
  "/:contentType/:contentId/add-comment",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { type, contentId } = req.params;
      const loggedInUser = req.currentUser;

      const newComment = await CommentModel.create({
        ...req.body,
        ...req.params,
        commentCreator: loggedInUser._id,
      });
      return res.status(201).json(newComment);
    } catch (err) {
      next(err);
    }
  }
);

//Editar comentario (U)
router.put(
  "/:contentType/:contentId/:commentId/edit-comment",
  isAuthenticated,
  attachCurrentUser,

  async (req, res, next) => {
    try {
      const { commentId } = req.params;

      const updatedComment = await CommentModel.findOneAndUpdate(
        { _id: commentId },
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
  "/:contentType/:contentId/:commentId/delete-comment",
  isAuthenticated,
  attachCurrentUser,

  async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const loggedInUser = req.currentUser;
      // Precisa disso?
      const comment = await CommentModel.findOne({ _id: commentId });
      const deletionResult = await CommentModel.deleteOne({ _id: commentId });

      if (deletionResult.n > 0) {
        const updatedUser = await UserModel.findOneAndUpdate(
          { _id: loggedInUser },
          { new: true }
        );

        if (updatedUser) {
          return res.status(200).json({});
        }
        return res.status(404).json({
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
