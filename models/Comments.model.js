const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const CommentsSchema = new Schema({
  title: { type: String, require: true },
  comment: { type: String, require: true, maxLength: 288 },
  userCreator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // Esse é o ID do conteúdo (filme ou serie) na API, não no nosso DB.
  contentId: { type: String, require: true },
});

const CommentsModel = model("Comments", CommentsSchema);

module.exports = CommentsModel;
