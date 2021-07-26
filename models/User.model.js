const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    required: true,
    default: "USER",
  },
  // Isso seria uma array de ObjectIds? Serão varios comentários feitos pelo usuário >
  userComments: { type: mongoose.Schema.Types.ObjectId, ref: "Comments" },
  userWatchList: { type: mongoose.Schema.Types.ObjectId, ref: "WatchList" },
  creationDate: { type: new Date() },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
