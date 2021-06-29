const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  DateCreated: { type: Date, default: Date.now },
  email: {
    type: String,
    trim: true,
    required: true,
    emailAuthenticated: false,
  },
  username: {
    type: String,
    trim: true,
    minLength: 6,
    maxLength: 26,
  },
  password: {
    type: String,
    trim: true,
  },
  Google: {
    type: String,
    trim: true,
  },
  Facebook: {
    type: String,
    trim: true,
  },
  Twitter: {
    type: String,
    trim: true,
  },
  Steam: {
    type: String,
    trim: true,
  },
  authProof: {
    type: String,
    trim: true,
  },
  accessToken: {
    type: String,
    trim: true,
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
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
