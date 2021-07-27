const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const WatchListModel = require("../models/WatchList.model");
const UserModel = require("../models/User.model");

// Criar uma watch list C
router.post(
  "/:contentType/:contentId/watchlist",
  isAuthenticated,
  attachCurrentUser,

  async (req, res, next) => {
    try {
      const loggedInUser = req.currentUser;
      const watchlist = await WatchListModel.create({
        ...req.params,
        watchListCreator: loggedInUser._id,
      });

      await UserModel.findOneAndUpdate(
        { _id: loggedInUser._id },
        {
          $push: {
            userWatchList: watchlist._id,
          },
        }
      );
      return res.status(200).json(watchlist);
    } catch (err) {
      next(err);
    }
  }
);

// Ver watchlists R

router.get(
  "/watchlist",
  isAuthenticated,
  attachCurrentUser,

  async (req, res, next) => {
    try {
      const loggedInUser = req.currentUser;
      const watchlists = await WatchListModel.find({
        watchListCreator: loggedInUser._id,
      });
      return res.status(200).json(watchlists);
    } catch (err) {
      next(err);
    }
  }
);

// Trocar status U

router.put(
  "/:contentType/:contentId/watchlist/change-status/:status",
  isAuthenticated,
  attachCurrentUser,

  async (req, res, next) => {
    try {
      const { contentType, contentId, status } = req.params;
      const loggedInUser = req.currentUser;

      const updateStatusWatched = await WatchListModel.findOneAndUpdate(
        {
          watchListCreator: loggedInUser._id,
          contentType: contentType,
          contentId: contentId,
        },
        // Toggle, trocar o status atual por outro. Modelo tem ENUM.
        { $set: { contentStatus: status } }
      );

      if (updateStatusWatched) {
        return res.status(200).json(updateStatusWatched);
      }
      return res
        .status(404)
        .json({ error: "Conteúdo não pode ser atualizado." });
    } catch (err) {
      next(err);
    }
  }
);

// Remover conteúdo da watchlist D

router.delete(
  "/:contentType/:contentId/watchlist/remove-content",
  isAuthenticated,
  attachCurrentUser,

  async (req, res, next) => {
    try {
      const loggedInUser = req.currentUser;
      const { contentType, contentId } = req.params;
      const deletionResult = await WatchListModel.deleteOne({
        watchListCreator: loggedInUser._id,
        contentType: contentType,
        contentId: contentId,
      });

      if (deletionResult.n > 0) {
        return res.status(200).json({});
      }
      return res
        .status(400)
        .json({ error: "Conteúdo não pode ser adicionado por conta de erro." });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
