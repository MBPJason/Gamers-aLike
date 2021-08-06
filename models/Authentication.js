const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
  DateCreated: { type: Date, default: Date.now },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  AuthProof: String,
  Google: {
    profile: Object,
    accessToken: String,
    refreshToken: String,
  },
  Twitter: {
    profile: Object,
    accessToken: String,
    refreshToken: String,
  },
  Facebook: {
    profile: Object,
    accessToken: String,
    refreshToken: String,
  },
  Steam: {
    profile: Object,
    identifier: String,
  },
});

const Auth = mongoose.model("Auth", AuthSchema);

module.exports = Auth;
