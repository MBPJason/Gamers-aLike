// THIS IS FOR LOGIN AND SIGN UP ONLY

// Dependencies
const express = require("express");
const router = require("express-promise-router")();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.SECRET;
// Schema Models
const db = require("../models");

// --------------------------
//  SIGN UP (Create Route)
// --------------------------

// TODO: Tie the login into a socket.io presence 

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
    // If one or more are missing reject response is given
    console.log("Couldn't make account");
    res.status(400).json({
      error: true,
      message: "Missing one or more of the parameters to make an account",
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

      // Created JWT token; Only an hour use.
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          Ratings: user.Ratings,
          PlayersInfo: user.PlayersInfo,
          DiscordInfo: user.DiscordInfo,
          GamerTags: user.GamerTags,
        },
        accessTokenSecret,
        { expiresIn: "1h" }
      );
      // If everything is done correctly this is the response back
      res.json({
        error: false,
        data: token,
        message: "Successfully signed up.",
      });
      console.log("Everything went right");
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

// TODO: Tie the login into a socket.io presence 

router.get("/api/login", async (req, res) => {
  console.log("Login is being called");
  // Grab requested login data from request
  const { email, password } = req.body;

  // Checking for empty parameters
  if (!email.trim() || !password.trim()) {
    console.log("Missing parameters");
    res.status(400).json({
      error: true,
      message: "Missing one or more of the parameters to login",
    });
  } else {
    // Finding user via email provided
    const user = await db.User.findOne({ email: email });
    // Checking email against stored hashed password
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
          accessTokenSecret,
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
  }
});

// Exporting functions for express use on server.js
module.exports = router;
