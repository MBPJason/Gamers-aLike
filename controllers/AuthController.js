// THIS IS FOR LOGIN, LOGOUT AND SIGN UP ONLY

// Dependencies
const express = require("express");
const router = require("express-promise-router")();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const accessTokenSecret = process.env.SECRET;
// Schema Models
const db = require("../models");

// --------------------------
//  SIGN UP (Create Route)
// --------------------------

router.post("/auth/signup", async (req, res) => {
  console.log("Signup is being called");
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

  // Check if all required parameters (email, password, username) to make a user is present
  if (!email.trim() || !password.trim() || !username.trim()) {
    // If one or more are missing reject response is given
    console.log("Couldn't make account");
    res.status(400).json({
      error: true,
      message: "Missing one or more of the parameters to make an account",
    });
  } else if (db.User.findOne({ email: email })) {
    res.json({
      message: "I am sorry that email is already taken",
    });
  } else {
    // Main build process for making an account
    // TODO: Check if the email account provided is already tied to an account

    // Try/Catch block for potential server side errors
    try {
      // Hash and salt password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Main User Schema built with user required parameters
      const user = await db.User.create({
        email: email,
        username: username,
        password: hashedPassword,
      });
      // Building out User essential Schemas
      const Ratings = await db.Ratings.create({
        userID: user._id,
        RatingsScore: 1,
      });
      const PlayersInfo = await db.Players.create({
        userID: user._id,
      });
      const DiscordInfo = await db.Discord.create({
        userID: user._id,
      });
      const GamerTags = await db.Gamertags.create({
        userID: user._id,
      });

      // Updating/Tying it to new User created Schema
      await db.User.findByIdAndUpdate(user._id, {
        Ratings: Ratings._id,
        PlayersInfo: PlayersInfo._id,
        DiscordInfo: DiscordInfo._id,
        GamerTags: GamerTags._id,
      });

      // Update Discord table if user provides a DiscordID
      if (DiscordID) {
        await db.Discord.findByIdAndUpdate(DiscordInfo._id, {
          DiscordID: DiscordID,
        });
      }

      // Update Gamertags table check if any gamertags were given in signup process
      if (SteamID) {
        await db.Gamertags.findByIdAndUpdate(GamerTags._id, {
          SteamID: SteamID,
        });
      }
      if (BattlenetID) {
        await db.Gamertags.findByIdAndUpdate(GamerTags._id, {
          BattlenetID: BattlenetID,
        });
      }
      if (PlayStationID) {
        await db.Gamertags.findByIdAndUpdate(GamerTags._id, {
          PlayStationID: PlayStationID,
        });
      }
      if (XboxID) {
        await db.Gamertags.findByIdAndUpdate(GamerTags._id, { XboxID: XboxID });
      }

      // // Created JWT token; Only an hour use.
      // const token = jwt.sign(
      //   {
      //     id: user._id,
      //     username: user.username,
      //     Ratings: user.Ratings,
      //     PlayersInfo: user.PlayersInfo,
      //     DiscordInfo: user.DiscordInfo,
      //     GamerTags: user.GamerTags,
      //   },
      //   accessTokenSecret,
      //   { expiresIn: "1h" }
      // );
      // // If everything is done correctly this is the response back
      // res.json({
      //   error: false,
      //   data: token,
      //   message: "Successfully signed up.",
      // });
      // console.log("Everything went right");
    } catch (error) {
      // If server side error this is the error response
      res.status(500).json({
        error: true,
        data: error,
        message: "Something went wrong",
      });
      console.log(error);
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
router.post("/auth/login/local", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ message: "Couldn't find user" });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      console.log(res);
      return res.json({ message: "Welcome " + user.username });
    });
  })(req, res, next);
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
    if (!req.user.username) {
      res.redirect("/finishing-touch");
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
