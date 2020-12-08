const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: true,
  },
  username: {
    type: String,
    trim: true,
    required: true,
    minLength: 4,
    maxLength: 26,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  CurrentLFG: {
    type: String,
    trim: true,
  },
  GamesPlayed: [
    {
      type: String,
      trim: true,
    },
  ],
  Ratings: {
    type: Schema.Types.ObjectId,
    ref: "Ratings",
    required: true
  },
  GamerTags: {
    type: Schema.Types.ObjectId,
    ref: "Gamertags",
  },
  DiscordInfo: {
    type: Schema.Types.ObjectId,
    ref: "Discord",
  },
  PlayersInfo: {
    type: Schema.Types.ObjectId,
    ref: "Players",
  }

});

const User = mongoose.model("User", UserSchema);

module.exports = User;
