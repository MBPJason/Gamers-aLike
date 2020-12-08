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
    bcrypt.hash(password, 10).then((hashedPassword) => {

    });
  }
});

module.exports = router;
