const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const CommentsSchema = new Schema({
  title: { type: String, require: true },
  comment: { type: String, require: true },
  userCreator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const CommentModel = model("Comment", CommentsSchema);

module.exports = CommentModel;
