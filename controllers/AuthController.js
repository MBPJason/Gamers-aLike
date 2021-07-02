// THIS IS FOR LOGIN, LOGOUT AND SIGN UP ONLY

// Dependencies
const router = require("express-promise-router")();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.SECRET;
const auth = require("../config/middleware/isAuthenticated");
const bcrypt = require("bcrypt");
const register = require("../config/passport/register");
// Schema Models
const db = require("../models");

// ------------------------------
//  SIGN UP LOCAL (Create Route)
// ------------------------------

router.post("/auth/signup", async (req, res) => {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  const {
    email,
    username,
    password,
    DiscordID,
    SteamID,
    BattlenetID,
    PlayStationID,
    XboxID,
    type,
    expire,
  } = req.body;

  // Check for signup
  if (type === "signup") {
    const signUp = await db.User.findOne({ email: email });
    if (signUp === null) {
      const madeUser = await register.localMakeUser(
        email,
        username,
        password,
        DiscordID,
        SteamID,
        BattlenetID,
        PlayStationID,
        XboxID
      );
      const token = await auth.authJWT(madeUser, expire);

      // TODO: Set response cookies
      res
        .status(200)
        .json({ authToken: token, message: "User made and token given" });
      console.log("User successfully made and serialized");
      console.log(token);
    } else {
      res
        .status(401)
        .json({ message: "A user with that email already exists" });
      console.log("User exists");
    }
  }
});

// --------------------------
//  LOGIN
// --------------------------

// TODO: Need 2 paths for passport authentication
// 1. For calling directly the function inside the passport strategy being called
// 2. Then a response path for where to redirect them to based on pass or fail

// Local Login Method
router.post("/auth/local/login", async (req, res) => {
  const { email, password, type, expire } = req.body;
  if (type === "signin") {
    const user = await db.User.findOne({ email: email });
    if (user) {
      if (!bcrypt.compare(password, user.password)) {
        res.status(403).send("Email and/or password did not match");
      } else {
        const token = await auth.authJWT(user, expire);

        // TODO: Set response cookies
        res.status(200).json({
          authToken: token,
          message: "User signed in and token given",
        });
        console.log("User successfully signed in and serialized");
        console.log(token);
      }
    }
  }
});

router.get(
  "/auth/cookie/login",
  passport.authenticate("jwt", { session: false }),
  auth.checkJWT,
  async (req, res) => {
    if (req.user) {
      res.redirect("http://localhost:3000/home", 200);
    }
  }
);

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

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000");
});

// Exporting functions for express use on server.js
module.exports = router;
