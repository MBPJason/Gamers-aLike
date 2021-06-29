// THIS IS FOR LOGIN, LOGOUT AND SIGN UP ONLY

// Dependencies
const router = require("express-promise-router")();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const accessTokenSecret = process.env.SECRET;
const auth = require("../config/middleware/isAuthenticated");
const bcrypt = require("bcrypt");
// Schema Models
const db = require("../models");

// --------------------------
//  SIGN UP (Create Route)
// --------------------------

router.post("/auth/signup", async function (req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.json({ message: "Welcome " + req.user.username });
  console.log("User successfully made and serialized");
});

// --------------------------
// UPDATE
// --------------------------

// THIS WILL ONLY BE CALLED TO COMPLETE THE SIGN UP PROCESS FOR THE NON-LOCAL PASSPORT STRATEGIES
// router.put("/auth/finishing-touches", isAuthenticated, async (req, res) => {
//   const {
//     userID,
//     email,
//     username,
//     password,
//     DiscordID,
//     SteamID,
//     BattlenetID,
//     PlayStationID,
//     XboxID,
//   } = req.body;

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = await db.User.findByIdAndUpdate(userID, {
//     email: email,
//     password: hashedPassword,
//     username: username,
//   });

//   if (DiscordID) {
//     await db.Discord.findByIdAndUpdate(user.DiscordInfo, {
//       DiscordID: DiscordID,
//     });
//   }
//   if (SteamID) {
//     await db.Gamertags.findByIdAndUpdate(user.GamerTags, {
//       SteamID: SteamID,
//     });
//   }
//   if (BattlenetID) {
//     await db.Gamertags.findByIdAndUpdate(user.GamerTags, {
//       BattlenetID: BattlenetID,
//     });
//   }
//   if (PlayStationID) {
//     await db.Gamertags.findByIdAndUpdate(user.GamerTags, {
//       PlayStationID: PlayStationID,
//     });
//   }
//   if (XboxID) {
//     await db.Gamertags.findByIdAndUpdate(user.GamerTags, { XboxID: XboxID });
//   }

//   res.redirect("/home");
// });

// --------------------------
//  LOGIN
// --------------------------

// TODO: Need 2 paths for passport authentication
// 1. For calling directly the function inside the passport strategy being called
// 2. Then a response path for where to redirect them to based on pass or fail

// Local Login Method
router.post("/auth/login/local", async function (req, res, next) {
  const { email, password, type } = req.body;
  if (type === "signin") {
    const user = await db.User.findOne({ email: email });
    if (user) {
      if (!bcrypt.compare(password, user.password)) {
        res.status(403).send("Email and/or password did not match");
      } else {
        res.redirect(200, "localhost:3000/home");
      }
    }
  }
});

// Facebook Login Method
router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    if (!req.user.username) {
      res.redirect("/finishing-touch");
    } else {
      res.redirect("/home");
    }
  }
);

// Google Login Method
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    if (!req.user.username) {
      res.redirect("/finishing-touch");
    } else {
      res.redirect("/home");
    }
  }
);

// Twitter Login Method
router.get("/auth/twitter", passport.authenticate("oauth2"));

router.get(
  "/auth/twitter/callback",
  passport.authenticate("oauth2", { failureRedirect: "/login" }),
  function (req, res) {
    if (!req.user.username) {
      res.redirect("/finishing-touch");
    } else {
      res.redirect("/");
    }
  }
);

// Steam Login Method
router.get("/auth/steam", passport.authenticate("steam"));

router.get(
  "/auth/steam/return",
  passport.authenticate("steam", { failureRedirect: "/login" }),
  function (req, res) {
    if (!req.user.email) {
      res.json({ type: "Steam" }).redirect("/finishing-touch");
    } else {
      res.redirect("/");
    }
  }
);

// --------------------------
//  LOGOUT
// --------------------------

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/login");
});

// Exporting functions for express use on server.js
module.exports = router;
