const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const UserModel = require("../models/User.model");
const WatchListModel = require("../models/WatchList.model");

//(R) Show watchlists

router.get(
  "/watchlist",
  isAuthenticated,
  attachCurrentUser,

  async (req, res, next) => {
    try {
      const watchlists = await WatchListModel.find();
      return res.status(200).json(watchlists);
    } catch (err) {
      next(err);
    }
  }
);

//(U) Adicionar/modificar watchlist especifica

router.put(
  "/watchlist/:id",
  isAuthenticated,
  attachCurrentUser,

  async (req, res, next) => {
    try {
      const { id } = req.params;

      const updatedwatchlist = await WatchListModel.findOneAndUpdate(
        { _id: id },
        { $set: { ...req.body } },
        { new: true }
      );

      if (updatedwatchlist) {
        return res.status(200).json(updatedwatchlist);
      }
      return res.status(404).json({ error: "watchlist não encontrada" });
    } catch (err) {
      next(err);
    }
  }
);

//(D) Deletar conteudo espeficico

router.delete(
  "/watchlist/:id",
  isAuthenticated,
  attachCurrentUser,

  async (req, res, next) => {
    try {
      const { id } = req.params;

      const deletionResult = await WatchListModel.deleteOne({ _id: id });

      if (deletionResult.n > 0) {
        return res.status(200).json({});
      }
      return res.status(400).json({ error: "watchlist não encontrada" });
    } catch (err) {
      next(err);
    }
  }
);
