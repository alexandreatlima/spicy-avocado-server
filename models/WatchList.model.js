const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const WatchListSchema = new Schema({
  contentType: { type: String, required: true, enum: ["movie", "tv"] },
  contentId: { type: Number, require: true },
  contentStatus: {
    type: String,
    enum: ["watched", "to-watch"],
    default: "to-watch",
  },
  watchListCreator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const WatchListModel = model("WatchList", WatchListSchema);

module.exports = WatchListModel;
