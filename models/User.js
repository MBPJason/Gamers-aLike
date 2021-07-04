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
UserSchema.virtual("fullyBuiltUser").get( async function () {
  return {
    userID: this._id,
    username: this.username,
    currentGame: this.CurrentLFG,
    gamesPlayed: this.GamesPlayed,
    userRatings: this.populate("Ratings").execPopulate( function (err, table) {
      if (err) {
        return new Error(err, "Something went wrong populating user ratings");
      } else {
        return {
          userScore: table.RatingsScore,
          userRatings: table.ratings,
        };
      }
    }),
    userGamerTags: await this.populate("GamerTags").execPopulate(function(err, table) {
      if (err) {
        console.log(err);
        return new Error("couldn't populate user gamertags")
      }
    }),
    userDiscordInfo: this.populate("DiscordInfo").execPopulate(function (err, table) {
      if (err) {
        return new Error(
          err,
          "Something went wrong populating user discord info"
        );
      } else {
        return {
          discordID: table.DiscordID,
          discordLink: table.DiscordLink,
          isUserOnPublic: table.IsOnPublic,
        };
      }
    }),
    userPlayersInfo: this.populate("PlayersInfo").execPopulate(function (err, table) {
      if (err) {
        return new Error(
          err,
          "Something went wrong populating user players info"
        );
      } else {
        return {
          quickplay: table.QuickPlay,
          playersMet: table.PlayersMet,
          ignoreList: table.Ignore,
        };
      }
    }),
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
    }),s
  };
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
