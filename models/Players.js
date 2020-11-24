const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayersSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  QuickPlay: [
    {
      playerID: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  PlayersMet: [
    {
      playerID: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  Ignore: [
    {
      playerID: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

const Players = mongoose.model("Players", PlayersSchema);

module.exports = Players;
