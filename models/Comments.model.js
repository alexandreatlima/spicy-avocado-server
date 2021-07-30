const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const CommentsSchema = new Schema({
  title: { type: String, required: true },
  comment: { type: String, required: true, maxLength: 288 },
  commentCreator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  contentType: { type: String, required: true, enum: ["movie", "tv"] },
  contentId: { type: String, required: true },
  commentId: String,
});

const CommentsModel = model("Comments", CommentsSchema);

module.exports = CommentsModel;
