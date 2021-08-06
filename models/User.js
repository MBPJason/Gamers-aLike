const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    DateCreated: { type: Date, default: Date.now },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      trim: true,
      minLength: 6,
      maxLength: 26,
      unique: true,
    },
    userAvatar: {
      type: String,
      trim: true,
    },
    password: {
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
    Auth: {
      type: Schema.Types.ObjectId,
      ref: "Auth",
    },
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
    Online: {
      type: Schema.Types.ObjectId,
      ref: "Discord",
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
UserSchema.virtual("fullyBuiltUser").get(function () {
  return {
    userID: this._id,
    username: this.username,
    userAvatar: this.userAvatar,
    currentGame: this.CurrentLFG || null,
    gamesPlayed: this.GamesPlayed || null,
    userRatings: {
      userScore: this.Ratings.RatingsScore,
      userRatings: this.Ratings.ratings,
    },
    userGamerTags: {
      steam: this.GamerTags.SteamID || null,
      battlenet: this.GamerTags.BattlenetID || null,
      playstation: this.GamerTags.PlayStationID || null,
      xbox: this.GamerTags.XboxID || null,
    },
    userDiscordInfo: {
      discordID: this.DiscordInfo.DiscordID || null,
      discordLink: this.DiscordInfo.DiscordLink || null,
      isUserOnPublic: this.DiscordInfo.IsOnPublic || null,
    },
  };
});

UserSchema.virtual("briefUser").get(function () {
  return {
    userID: this._id,
    username: this.username,
    userAvatar: this.Online.userAvatar,
    userRatings: {
      userScore: this.Ratings.RatingsScore,
      userRatings: this.Ratings.ratings,
    },
  };
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
