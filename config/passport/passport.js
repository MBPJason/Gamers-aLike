// Dependencies
const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-oauth2").Strategy;
const SteamStrategy = require("passport-steam").Strategy;
const db = require("../../models");

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


// // Google Strategy
// passport.use(new GoogleStrategy({
//   clientID: GOOGLE_CLIENT_ID,
//   clientSecret: GOOGLE_CLIENT_SECRET,
//   callbackURL: "http://www.example.com/auth/google/callback"
// },
// function(accessToken, refreshToken, profile, cb) {
//   User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     return cb(err, user);
//   });
// }
// ));


// // Facebook Strategy
// passport.use(new FacebookStrategy({
//   clientID: FACEBOOK_APP_ID,
//   clientSecret: FACEBOOK_APP_SECRET,
//   callbackURL: "http://localhost:3000/auth/facebook/callback"
// },
// function(accessToken, refreshToken, profile, cb) {
//   User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//     return cb(err, user);
//   });
// }
// ));


// // Twitter Strategy
// passport.use(new TwitterStrategy({
//     authorizationURL: 'https://www.example.com/oauth2/authorize',
//     tokenURL: 'https://www.example.com/oauth2/token',
//     clientID: EXAMPLE_CLIENT_ID,
//     clientSecret: EXAMPLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/example/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     db.User.findOrCreate({ exampleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));

// // Steam Strategy
// passport.use(new SteamStrategy({
//     returnURL: 'http://localhost:3000/auth/steam/return',
//     realm: 'http://localhost:3000/',
//     apiKey: 'your steam API key'
//   },
//   function(identifier, profile, done) {
//     db.User.findByOpenID({ openId: identifier }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));

module.exports = passport;
