const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const CommentsSchema = new Schema({
  title: { type: String, require: true },
  comment: { type: String, require: true, maxLength: 288 },
  commentCreator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  contentType: { type: String, require: true, enum: ["Movie", "Serie"] },
  contentId: { type: String, require: true },
});

const CommentsModel = model("Comments", CommentsSchema);

module.exports = CommentsModel;
