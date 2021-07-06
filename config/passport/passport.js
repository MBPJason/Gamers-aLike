// Dependencies
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-oauth2").Strategy;
const SteamStrategy = require("passport-steam").Strategy;


const db = require("../../models");

const pathToPub = path.join(__dirname, "../../keys", "jwtRS256.key.pub");
const CLIENT_PUB_KEY = fs.readFileSync(pathToPub, "utf8");

// Issuing Session tokens
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Options commented to out, but left to see full list of options.
const passportJWTOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: CLIENT_PUB_KEY,
  // issuer: "enter issuer here",
  // audience: "enter audience here",
  algorithms: ["RS256"],
  // ignoreExpiration: false,
  // passReqToCallback: false,
  jsonWebTokenOptions: {
    // complete: false,
    // clockTolerance: "",
    maxAge: "1y", // 1 year
    // clockTimestamp: "100",
    // nonce: "string here for OpenID",
  },
};

// JWT Strategy
passport.use(
  new JWTStrategy(passportJWTOptions, async ( jwt_payload, done) => {

    // Checking for user via json as key
    await db.User.findOne({ _id: jwt_payload.sub }, async function (err, user) {
      // Check for errors during the process
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    });
  })
);

// // Google Strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://www.gamersalike.com/auth/google/callback",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       db.User.findOne({ Google: profile.id }, function (err, user) {
//         if (err) {
//           return cb(err);
//         }
//         if (!user) {
//           return cb(null, makeUser("Google", null, profile, err));
//         }
//         return cb(null, user);
//       });
//     }
//   )
// );

// // Facebook Strategy
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: "http://localhost:3000/auth/facebook/callback",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       db.User.findOne({ Facebook: profile.id }, function (err, user) {
//         if (err) {
//           return cb(err);
//         }
//         if (!user) {
//           return cb(null, makeUser("Facebook", null, profile, err));
//         }
//         return cb(null, user);
//       });
//     }
//   )
// );

// Twitter Strategy
// passport.use(
//   new TwitterStrategy(
//     {
//       authorizationURL: "https://www.example.com/oauth2/authorize",
//       tokenURL: "https://www.example.com/oauth2/token",
//       clientID: process.env.TWITTER_CLIENT_ID,
//       clientSecret: process.env.TWITTER_CLIENT_SECRET,
//       callbackURL: "http://localhost:3000/auth/example/callback",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       db.User.findOne({ Twitter: profile.id }, function (err, user) {
//         if (err) {
//           return cb(err);
//         }
//         if (!user) {
//           return cb(null, makeUser("Twitter", null, profile, err));
//         }
//         return cb(null, user);
//       });
//     }
//   )
// );

// Steam Strategy
passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:3000/auth/steam/return",
      realm: "http://localhost:3000/",
      apiKey: process.env.STEAM_API_KEY,
    },
    function (identifier, profile, done) {
      db.User.findOne({ Steam: identifier }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, makeUser("Steam", identifier, null, err));
        }
        return done(null, user);
      });
    }
  )
);

module.exports = passport;
