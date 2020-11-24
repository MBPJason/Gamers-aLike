const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GamertagsSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  SteamID: {
    type: String,
    trim: true,
  },
  BattlenetID: {
    type: String,
    trim: true,
  },
  PSN_ID: {
    type: String,
    trim: true,
  },
  XboxID: {
    type: String,
    trim: true,
  },
});

const Gamertags = mongoose.model("Gamertags", GamertagsSchema);

module.exports = Gamertags;
