// THIS IS FOR LOGIN, LOGOUT AND SIGN UP ONLY

// Dependencies
require("dotenv").config();
const router = require("express-promise-router")();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.SECRET;
const cookieSecret = process.env.COOKIE_CRYPTO;
const auth = require("../config/middleware/isAuthenticated");
const bcrypt = require("bcrypt");
const register = require("../config/passport/register");
const baseURL = "localhost";

// Schema Models
const db = require("../models");

// Build options for Dryness
let maxAge;
const cookieSignOptions = {
  domain: baseURL,
  path: "/",
  maxAge: maxAge,
  signed: true,
};

// ------------------------------
//  SIGN UP LOCAL (Create Route)
// ------------------------------

router.post("/auth/signup", async (req, res) => {
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
      const lockedCookieSecret = await bcrypt.hash(cookieSecret, 10);

      if (!token) {
        res.status(500).send("Couldn't authorize user");
      } else {
        // If req.body.expire is null set maxAge to a day. If it isn't set maxAge to a year
        expire === "1d" ? (maxAge = 86400e3) : (maxAge = 314496e5);

        const userInfoToken = jwt.sign(madeUser, accessTokenSecret, {
          expiresIn: "3m",
        });

        /**
         * Set status code as 200
         * Set Auth cookie TODO: Make it a secure and samesite cookie eventually
         * Set "special" cookie TODO: Make it a secure and samesite cookie eventually
         */
        res
          .status(200) // Set status code as 200
          .cookie("__AUTH", token, cookieSignOptions) //
          .cookie(
            "user",
            { userID: user.userID, username: user.username },
            cookieSignOptions
          )
          .cookie("special", lockedCookieSecret, {
            domain: baseURL,
            path: "/",
            maxAge: maxAge,
            httpOnly: true,
            signed: true,
          })
          .json({
            userToken: userInfoToken,
          });
        console.log("User successfully signed in and serialized");
        console.log(userInfoToken);
      }
    } else {
      res
        .status(401)
        .json({ message: "A user with that email already exists" });
      console.log("User exists");
    }
  } else {
    res.status(401).send("Please signup with the normal route");
  }
});

// Test route for middleware checks
router.get("/protected", auth.validateCookie, (req, res) => {
  console.log("protected was called");
  res.json({ message: "You are authorized" });
});

// --------------------------
//  LOGIN
// --------------------------

// Local Login Method
router.post("/auth/local/login", async (req, res) => {
  // Pull email, password, type, and expire out of req.body
  const { email, password, type, expire } = req.body;
  // Check for correct form input
  if (type === "signin") {
    // Find user by email, populate all fields and set user variable
    let user = await db.User.findOne({ email: email })
      .populate("GamerTags")
      .populate("DiscordInfo")
      .populate("Ratings")
      .populate("PlayersInfo")
      .exec();

    // Check is a user was provided with email check
    if (user) {
      // If user is present check password given against stored hashed password
      if (!bcrypt.compare(password, user.password)) {
        // If no match give a 403 error
        res.status(403).send("Email and/or password did not match");
      } else {
        /**
         * Set user variable as user.fullyBuiltUser virtual
         * Grab user auth token
         * Hash cookie secret
         */
        user = user.fullyBuiltUser;
        const token = await auth.authJWT(user, expire);
        const lockedCookieSecret = await bcrypt.hash(cookieSecret, 10);

        if (!token) {
          res.status(500).send("Couldn't authorize user");
        } else {
          // If req.body.expire is '1d' set maxAge to a day. If it isn't set maxAge to a year
          expire === "1d" ? (maxAge = 86400e3) : (maxAge = 314496e5);

          const userInfoToken = jwt.sign(user, accessTokenSecret, {
            expiresIn: "3m",
          });

          /**
           * Set status code as 200
           * Set Auth cookie TODO: Make it a secure and samesite cookie eventually
           * Set "special" cookie TODO: Make it a secure and samesite cookie eventually
           */
          res
            .status(200) // Set status code as 200
            .cookie("__AUTH", token, cookieSignOptions) //
            .cookie(
              "user",
              { userID: user.userID, username: user.username },
              cookieSignOptions
            )
            .cookie("special", lockedCookieSecret, {
              domain: baseURL,
              path: "/",
              maxAge: maxAge,
              httpOnly: true,
              signed: true,
            })
            .json({
              userToken: userInfoToken,
            });
          console.log("User successfully signed in and serialized");
          console.log(userInfoToken);
        }
      }
    } else {
      // If no user send back 403 status code
      res.status(403).send("Email and/or password did not match");
    }
  } else {
    res.status(401).send("Go login in with the proper route");
  }
});

router.get(
  "/auth/cookie/login",
  passport.authenticate("jwt", { session: false }, { session: false }),
  auth.checkJWT,
  async (req, res) => {
    if (req.user) {
      res.redirect("http://localhost:3000/home", 200);
    }
  }
);

// =================================================================================
// TODO: Need 2 paths for passport OAUTH and OpenID authentication
// 1. For calling directly the function inside the passport strategy being called
// 2. Then a response path for where to redirect them to based on pass or fail
// =================================================================================

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
  passport.authenticate("google", { session: false, scope: ["profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  function (req, res) {
    if (!req.user.username) {
      res.redirect("/finishing-touch");
    } else {
      res.redirect("/home");
    }
  }
);

// Twitter Login Method
router.get(
  "/auth/twitter",
  passport.authenticate("oauth2", { session: false })
);

router.get(
  "/auth/twitter/callback",
  passport.authenticate("oauth2", {
    session: false,
    failureRedirect: "/login",
  }),
  function (req, res) {
    if (!req.user.username) {
      res.redirect("/finishing-touch");
    } else {
      res.redirect("/home");
    }
  }
);

// Steam Login Method
router.get("/auth/steam", passport.authenticate("steam", { session: false }));

router.get(
  "/auth/steam/return",
  passport.authenticate("steam", { session: false, failureRedirect: "/login" }),
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

router.get("/auth/logout", (req, res) => {
  let clearCookieOptions = {
    domain: baseURL,
    path: "/",
    signed: true,
  };
  req.logout();
  res
    .clearCookie("__AUTH", clearCookieOptions)
    .clearCookie("user", clearCookieOptions)
    .clearCookie("special", {
      domain: baseURL,
      path: "/",
      signed: true,
      httpOnly: true,
    })
    .redirect("http://localhost:3000");
});

// Exporting functions for express use on server.js
module.exports = router;
