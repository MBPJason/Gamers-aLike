const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingsSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  ratings: [
    {
      Rat1: {
        type: Number,
      },
    },
    {
      Rat2: {
        type: Number,
      },
    },
    {
      Rat3: {
        type: Number,
      },
    },
    {
      Rat4: {
        type: Number,
      },
    },
    {
      Rat5: {
        type: Number,
      },
    },
    {
      Rat6: {
        type: Number,
      },
    },
  ],
});

const Ratings = mongoose.model("Ratings", RatingsSchema);

module.exports = Ratings;
