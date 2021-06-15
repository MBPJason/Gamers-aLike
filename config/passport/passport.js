// Dependencies
const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-oauth2").Strategy;
const SteamStrategy = require("passport-steam").Strategy;
const db = require("../../models");

const makeUser = async function (caller, identifier, profile, err) {
  console.log("Making a user");

  // Main build process for making an account

  // Try/Catch block for potential server side errors
  try {
    let userIdentifier = profile.id || identifier;

    // Main User Schema built with user required parameters
    const user = await db.User.create({
      [`profileID`[caller]]: userIdentifier,
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

    // Checks for Steam and non Steam Sign Up
    if (caller === "Steam") {
      await db.Gamertags.findByIdAndUpdate(GamerTags._id, {
        SteamID: identifier._id,
      });
    } else {
      await db.User.findByIdAndUpdate(user._id, {
        email: profile.email,
      });
    }
  } catch (error) {
    console.log(error);
    return (err = {
      error: true,
      data: error,
      message: "Something went wrong",
    });
  }
};

// Issuing Session tokens
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Local Strategy
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    function (email, password, done) {
      db.User.findOne({ email: email }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          console.log(email);
          return done(null, false);
        }
        if (!bcrypt.compare(password, user.password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://www.example.com/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ email: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

// Twitter Strategy
passport.use(
  new TwitterStrategy(
    {
      authorizationURL: "https://www.example.com/oauth2/authorize",
      tokenURL: "https://www.example.com/oauth2/token",
      clientID: process.env.EXAMPLE_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/example/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      db.User.findOrCreate({ exampleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

// Steam Strategy
passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:3000/auth/steam/return",
      realm: "http://localhost:3000/",
      apiKey: process.env.STEAM_API_KEY,
    },
    function (identifier, profile, done) {
      db.User.findByOpenID({ openId: identifier }, function (err, user) {
        return done(err, user);
      });
    }
  )
);

module.exports = passport;
