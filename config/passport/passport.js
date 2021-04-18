// Dependencies
const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const OAuth2Strategy = require("passport-oauth2").Strategy;
const SteamStrategy = require("passport-steam").Strategy;
const db = require("../../models");

// Issuing Session tokens
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Local Strategy
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    function (email, password, done) {
      console.log(email);
      console.log(password);
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

// // OAuth2.0 Strategy
// passport.use(new OAuth2Strategy({
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
