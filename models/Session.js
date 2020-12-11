const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  Host: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  UserLimit: {
      type: Number,
      max: 16,
    },
  Users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      }
  ],
  Game: {
    type: String,
    trim: true,
  },
  Headline: {
    type: String,
    trim: true,
  },
  DiscordLink: {
    type: String,
    trim: true,
  },
  Public: {
    type: Boolean,
    default: true
  },
  InviteOnly: false,
  Filters: [
      {Mature: false},
      {Experience: [
          {Any: false},
          {Beginner: false},
          {Mid: false},
          {Advance: false}
      ]},
      {RatingScore: [
          {Any: true},
          {LessThan50: false},
          {LessThan100: false},
          {LessThan200: false},
          {Above200: false},
      ]},
      {Preferred: [
          {Rat1: false},
          {Rat2: false},
          {Rat3: false},
          {Rat4: false},
          {Rat5: false},
          {Rat6: false},
      ]
    }
  ],
});

const Session = mongoose.model("Session", SessionSchema);

module.exports = Session;
