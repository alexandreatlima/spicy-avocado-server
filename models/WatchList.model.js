const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const WatchListSchema = new Schema({
  type: { type: String, required: true, enum: ["Movie", "Serie"] },
  //Tipo Number ou String?
  contentId: { type: Number, required: true },
  watchListCreator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const WatchListModel = model("WatchList", WatchListSchema);

module.exports = WatchListModel;
