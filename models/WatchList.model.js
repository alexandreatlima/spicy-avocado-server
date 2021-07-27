const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const WatchListSchema = new Schema({
  contentType: { type: String, required: true, enum: ["movie", "serie"] },
  contentId: { type: Number, require: true },
  contentStatus: {
    type: String,
    require: true,
    enum: ["Watched", "To watch"],
    default: "To watch",
  },
  watchListCreator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const WatchListModel = model("WatchList", WatchListSchema);

module.exports = WatchListModel;
