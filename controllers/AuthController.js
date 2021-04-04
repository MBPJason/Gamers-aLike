// THIS IS FOR LOGIN AND SIGN UP ONLY

// Dependencies
const express = require("express");
const router = require("express-promise-router")();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Schema Models
const db = require("../models");

// --------------------------
//  SIGN UP (Create Route)
// --------------------------

router.post("/api/signup", async (req, res) => {
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
    console.log("Couldn't make account");
    res.status(400).json({
      error: true,
      message: "Missing one or more of the parameters to make an account",
    });
  } else {
    // Main build process for making an account
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await db.User.create({
        email: email,
        username: username,
        password: hashedPassword,
      });

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

      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          Ratings: user.Ratings,
          PlayersInfo: user.PlayersInfo,
          DiscordInfo: user.DiscordInfo,
          GamerTags: user.GamerTags,
        },
        process.env.SECRET,
        { expiresIn: "1h" }
      );
      res.json({
        error: false,
        data: token,
        message: "Successfully signed up.",
      });
      console.log("Everything went right");
    } catch (error) {
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

router.get("/api/login", async (req, res) => {
  console.log("Login is being called");
  // Grab requested login data
  const { email, password } = req.body;

  const user = await db.User.findOne({ email: email });

  const matchedUser = await bcrypt.compare(password, user.password);

  // Conditional Switch for matching user
  if (matchedUser) {
    // Try/Catch block for potential server side errors
    try {
      // If user provided info matches with a user in the database, a login token is provided
      const token = jwt.sign(
        {
          email: user.email,
          name: user.username,
        },
        process.env.SECRET,
        { expiresIn: "1d" }
      );
      console.log("Successful Login");
      res.json({
        error: false,
        data: token,
        message: "Successfully logged in",
      });
    } catch (error) {
      // Catch error on server end part
      res.status(500).json({
        error: true,
        data: error,
        message: "Something went wrong",
      });
      console.log(error);
    }
  } else {
    // If user provided info doesn't match with a user in the database, send back error message
    console.log("Couldn't log in");
    res.status(401).json({
      error: true,
      message: "Incorrect username and/or password",
    });
  }
});

// --------------------------
//  UPDATE
// --------------------------

router.post("/api/update/email", async (req, res) => {});

router.post("/api/update/password", async (req, res) => {});

router.post("/api/update/GamerTags", async (req, res) => {});

router.post("/api/update/Discord", async (req, res) => {});

module.exports = router;
