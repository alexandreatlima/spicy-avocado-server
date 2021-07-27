const express = require("express");
const router = express.Router();

const CommentsModel = require("../models/Comments.model");
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
      const loggedInUser = req.currentUser;

      const newComment = await CommentsModel.create({
        ...req.body,
        ...req.params,
        commentCreator: loggedInUser._id,
      });

      await UserModel.findOneAndUpdate(
        { _id: loggedInUser._id },
        {
          $push: {
            userComments: newComment._id,
          },
        }
      );

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

      const updatedComment = await CommentsModel.findOneAndUpdate(
        { _id: commentId },
        { $set: { ...req.body } }
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

      const deletionResult = await CommentsModel.deleteOne({ _id: commentId });
      // Testar
      if (deletionResult.n > 0) {
        const updatedUser = await UserModel.findOneAndUpdate(
          { _id: loggedInUser._id },
          {
            $pull: {
              userComments: commentId,
            },
          }
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
