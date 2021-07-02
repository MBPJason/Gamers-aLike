const router = require("express-promise-router")();
const passport = require("passport");
const auth = require("../config/middleware/isAuthenticated");

// --------------------------
// UPDATE
// --------------------------

// THIS WILL ONLY BE CALLED TO COMPLETE THE SIGN UP PROCESS FOR THE NON-LOCAL PASSPORT STRATEGIES
router.put(
  "/user/finishing-touches",
  passport.authenticate("jwt", { session: false }),
  auth.checkJWT,
  async (req, res) => {
    const {
      userID,
      email,
      username,
      password,
      DiscordID,
      SteamID,
      BattlenetID,
      PlayStationID,
      XboxID,
    } = req.body;

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

    res.redirect("/home");
  }
);
