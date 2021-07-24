const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const WatchListSchema = new Schema({
  content: [
    new Schema({
      title: { type: String, required: true, trim: true },
      year: String,
      posterUrl: String,
    }),
  ],
  userCreator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const WatchListModel = model("WatchList", WatchListSchema);

module.exports = WatchListModel;
