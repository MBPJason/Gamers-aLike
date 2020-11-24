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
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
