const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayersSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "Online",
    },
  ],
  playersMet: [
    {
      type: Schema.Types.ObjectId,
      ref: "Online",
    },
  ],
  ignore: [
    {
      type: Schema.Types.ObjectId,
      ref: "Online",
    },
  ],
});

const Players = mongoose.model("Players", PlayersSchema);

module.exports = Players;
