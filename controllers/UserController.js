const router = require("express-promise-router")();
const passport = require("passport");
const auth = require("../config/middleware/isAuthenticated");

// ================================
//          READ
// ===============================
router.get(
  "/api/userInfo",
  passport.authenticate("jwt", { session: false }),
  auth.validateCookie,
  auth.checkJWT,
  async (req, res) => {
    res.json({ user: req.user });
  }
);

// ===============================
//          UPDATE
// ===============================

// THIS WILL ONLY BE CALLED TO COMPLETE THE SIGN UP PROCESS FOR THE NON-LOCAL PASSPORT STRATEGIES
router.put(
  "/api/user/finishing-touches",
  auth.validateCookie,
  auth.checkJWT,
  async (req, res) => {
    const {
      email,
      username,
      password,
      DiscordID,
      SteamID,
      BattlenetID,
      PlayStationID,
      XboxID,
    } = req.body;

    const userID = req.signedCookies.user.userID;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.User.findByIdAndUpdate(userID, {
      email: email,
      password: hashedPassword,
      username: username,
    });

    if (DiscordID) {
      await db.Discord.findByIdAndUpdate(user.DiscordInfo, {
        DiscordID: DiscordID,
      });
    }
    if (SteamID) {
      await db.Gamertags.findByIdAndUpdate(user.GamerTags, {
        SteamID: SteamID,
      });
    }
    if (BattlenetID) {
      await db.Gamertags.findByIdAndUpdate(user.GamerTags, {
        BattlenetID: BattlenetID,
      });
    }
    if (PlayStationID) {
      await db.Gamertags.findByIdAndUpdate(user.GamerTags, {
        PlayStationID: PlayStationID,
      });
    }
    if (XboxID) {
      await db.Gamertags.findByIdAndUpdate(user.GamerTags, { XboxID: XboxID });
    }

    let fullUser = await db.User.findOne({ email: email })
      .populate("GamerTags")
      .populate("DiscordInfo")
      .populate("Ratings")
      .populate("PlayersInfo")
      .exec();

    const cleanUser = fullUser.fullyBuiltUser;

    res.json({ user: cleanUser });
  }
);

module.exports = router;