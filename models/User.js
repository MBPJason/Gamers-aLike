const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
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
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
UserSchema.virtual("fullyBuiltUser").get(function () {
  return {
    userID: this._id,
    username: this.username,
    currentGame: this.CurrentLFG,
    gamesPlayed: this.GamesPlayed,
    userRatings: {
      userScore: this.Ratings.RatingsScore,
      userRatings: this.Ratings.ratings,
    },
    userGamerTags: {
      steam: this.GamerTags.SteamID,
      battleNet: this.GamerTags.BattlenetID,
      playstation: this.GamerTags.PlayStationID,
      xbox: this.GamerTags.XboxID,
    },
    userDiscordInfo: {
      discordID: this.DiscordInfo.DiscordID,
      discordLink: this.DiscordInfo.DiscordLink,
      isUserOnPublic: this.DiscordInfo.IsOnPublic,
    },
    userPlayersInfo: {
      quickplay: this.PlayersInfo.QuickPlay,
      playersMet: this.PlayersInfo.PlayersMet,
      ignoreList: this.PlayersInfo.Ignore,
    },
  };
});

UserSchema.virtual("briefUser").get(function () {
  return {
    userID: this._id,
    username: this.username,
    userRatings: this.populate("Ratings").execPopulate(function (err, table) {
      if (err) {
        return new Error(err, "Something went wrong populating user ratings");
      } else {
        return {
          userScore: table.RatingsScore,
          userRatings: table.ratings,
        };
      }
    }),
  };
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
