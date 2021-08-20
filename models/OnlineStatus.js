const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OnlineSchema = new Schema(
  {
    sessionID: String,
    userID: { type: String, unique: true },
    user: Object,
    currentGame: {
      type: String,
      trim: true,
    },
    gamesPlayed: [
      {
        type: String,
        trim: true,
      },
    ],
    status: Boolean,
    invites: [
      {
        id: String,
        username: String,
        userAvatar: String,
        session: String,
        game: String,
        seen: Boolean,
        dateCreated: {type: Date, default: Date.now}
      },
    ],
    friendsInvites: [
      {
        sender: String,
        senderAvatar: String,
        dateCreated: {type: Date, default: Date.now}
      }
    ]

  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

OnlineSchema.virtual("sessionInfo").get(function () {
  return {
    sessionID: this.sessionID,
    user: this.user,
    status: this.status,
    currentGame: this.currentGame,
    gamesPlayed: this.gamesPlayed,
    invites: this.invites,
    friendsInvites: this.friendsInvites
  };
});

OnlineSchema.virtual("quickInfo").get(function () {
  return {
    sessionID: this.sessionID,
    user: this.user,
    currentGame: this.currentGame,
    status: this.status,
  };
});

const Online = mongoose.model("Online", OnlineSchema);

module.exports = Online;
