const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OnlineSchema = new Schema(
  {
    socketID: String,
    sessionID: String,
    userID: String,
    user: Object,
    status: Boolean,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

OnlineSchema.virtual("sessionInfo").get(function () {
  return {
    sessionID: this.sessionID,
    user: this.user,
  };
});

const Online = mongoose.model("Online", OnlineSchema);

module.exports = Online;
