const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OnlineSchema = new Schema({
  socketID: { type: String, trim: true, required: true },
  sessionID: { type: String, trim: true, required: true },
  userID: { type: String, trim: true, required: true },
  user: Object,
  status: { type: Boolean, required: true },
});

OnlineSchema.virtual("sessionInfo").get(function () {
  return {
    sessionID: this.sessionID,
    user: this.user,
  };
});

const Online = mongoose.model("Online", OnlineSchema);

module.exports = Online;
