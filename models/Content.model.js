const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const ContentSchema = new Schema({
  contentType: { type: String, required: true, enum: ["movie", "serie"] },
  contentId: { type: Number, required: true },
  original_title: { type: String, required: true },
  popularity: { type: Number, required: true },
  likeCounter: { type: Number, required: true, default: 0 },
  dislikeCounter: { type: Number, required: true, default: 0 },
});

const ContentModel = model("Content", ContentSchema);
module.exports = ContentModel;
