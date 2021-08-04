const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OnlineSchema = new Schema(
  {
    sessionID: String,
    userID: String,
    user: Object,
    status: Boolean,
    QuickPlay: [
      {
        type: String,
      },
    ],
    PlayersMet: [
      {
        type: String,
      },
    ],
    Ignore: [
      {
        type: String,
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
    quickplay: this.QuickPlay,
    playersMet: this.PlayersMet,
    ignore: this.Ignore,
  };
});

const Online = mongoose.model("Online", OnlineSchema);

module.exports = Online;
