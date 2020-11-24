const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscordSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  DiscordID: {
    type: String,
    trim: true,
  },
  DiscordLink: {
    type: String,
    trim: true,
  },
});

const Discord = mongoose.model("Discord", DiscordSchema);

module.exports = Discord;
