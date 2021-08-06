const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OnlineSchema = new Schema(
  {
    sessionID: String,
    userID: { type: String, unique: true },
    user: Object,
    status: Boolean,
    quickPlay: [
      {
        type: String,
      },
    ],
    playersMet: [
      {
        type: String,
      },
    ],
    ignore: [
      {
        type: String,
      },
    ],
    invites: [
      {
        id: String,
        username: String,
        userAvatar: String,
        session: String,
        game: String,
        seen: Boolean,
        dateCreated: Date,
      },
    ],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

OnlineSchema.virtual("sessionInfo").get(function () {
  return {
    sessionID: this.sessionID,
    user: this.user,
    status: this.status,
    quickplay: this.quickPlay,
    playersMet: this.playersMet,
    ignore: this.ignore,
    invites: this.invites,
  };
});

OnlineSchema.virtual("quickInfo").get(function () {
  return {
    sessionID: this.sessionID,
    username: this.user.username,
    userAvatar: this.user.userAvatar,
    currentGame: player.user.currentGame,
    status: this.status,
  };
});

const Online = mongoose.model("Online", OnlineSchema);

module.exports = Online;
