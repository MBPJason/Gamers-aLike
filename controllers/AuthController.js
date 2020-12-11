const express = require("express");
const router = require("express-promise-router")();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../models");

// TODO: Sign Up Route (POST Route)

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

  if (!email.trim() || !password.trim() || !username.trim()) {
    res.status(400);
  } else {
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
          _id: user._id,
          username: user.username,
          Ratings: user.Ratings,
          PlayersInfo: user.PlayersInfo,
          DiscordInfo: user.DiscordInfo,
          GamerTags: user.GamerTags
        },
        process.env.SECRET
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

module.exports = router;
