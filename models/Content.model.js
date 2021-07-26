const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const ContentSchema = new Schema({
  id: { type: Number, required: true },
  original_name: { type: String, required: true },
  popularity: { type: Number, required: true },
  type: { type: String, required: true, enum: ["movie", "serie"] },
  like: { type: Number, required: true, default: 0 },
  dislike: { type: Number, required: true, default: 0 },
});

const ContentModel = model("Content", ContentSchema);
module.exports = ContentModel;
