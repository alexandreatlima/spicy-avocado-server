const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const WatchListModel = require("../models/WatchList.model");
const UserModel = require("../models/User.model");

// Criar uma watch list
router.post(
  "/watchlist/:contentType/:contentId",
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
      return res.status(200).json(watchlists);
    } catch (err) {
      next(err);
    }
  }
);

// Ver watchlists

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

// Trocar status

router.put(
  "/watchlist/update-status/:contentType/:contentId",
  isAuthenticated,
  attachCurrentUser,

  async (req, res, next) => {
    try {
      const addContentWatchList = await WatchListModel.findOneAndUpdate(
        { watchListCreator: loggedInUser },
        // Ta certo isso aqui?
        { $set: { ...req.params, loggedInUser } },
        { new: true }
      );

      if (addContentWatchList) {
        return res.status(200).json(addContentWatchList);
      }
      return res
        .status(404)
        .json({ error: "Conteúdo não pode ser adicionado por conta de erro." });
    } catch (err) {
      next(err);
    }
  }
);

// Remover conteúdo da watchlist

router.delete(
  "/watchlist/:contentType/:contentId",
  isAuthenticated,
  attachCurrentUser,

  async (req, res, next) => {
    try {
      const loggedInUser = req.currentUser;
      const deletionResult = await WatchListModel.deleteOne({
        watchListCreator: loggedInUser,
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

// Editar status do conteúdo

router.put(
  "/watchlist/:contentType/:contentId",
  isAuthenticated,
  attachCurrentUser,

  async (req, res, next) => {
    try {
      const editStatusWatchList = await WatchListModel.findOneAndUpdate(
        { watchListCreator: loggedInUser },
        // contents é uma array, preciso acessar um obj dentro dessa array com um objectId especfico e mudar o status dele.
        { $set: { ...req.params, loggedInUser } },
        { new: true }
      );

      if (addContentWatchList) {
        return res.status(200).json(addContentWatchList);
      }
      return res
        .status(404)
        .json({ error: "Conteúdo não pode ser adicionado por conta de erro." });
    } catch (err) {
      next(err);
    }
  }
);
