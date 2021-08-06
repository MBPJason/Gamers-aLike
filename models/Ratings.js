const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingsSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  RatingsScore: {
    type: Number,
    required: true,
    min: 1,
  },
  ratings: [
    {
      Rat1: Number,
    },
    {
      Rat2: Number,
    },
    {
      Rat3: Number,
    },
    {
      Rat4: Number,
    },
    {
      Rat5: Number,
    },
    {
      Rat6: Number,
    },
  ],
});

const Ratings = mongoose.model("Ratings", RatingsSchema);

module.exports = Ratings;
