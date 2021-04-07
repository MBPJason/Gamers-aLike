// Dependencies
const LocalPassport = require("passport-local");
const OAuth2Passport = require("passport-oauth2");
const SteamPassport = require("passport-steam");

// Local Strategy
LocalPassport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));


// OAuth2.0 Strategy
OAuth2Passport.use(new OAuth2Strategy({
    authorizationURL: 'https://www.example.com/oauth2/authorize',
    tokenURL: 'https://www.example.com/oauth2/token',
    clientID: EXAMPLE_CLIENT_ID,
    clientSecret: EXAMPLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/example/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ exampleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


// Steam Strategy 
SteamPassport.use(new SteamStrategy({
    returnURL: 'http://localhost:3000/auth/steam/return',
    realm: 'http://localhost:3000/',
    apiKey: 'your steam API key'
  },
  function(identifier, profile, done) {
    User.findByOpenID({ openId: identifier }, function (err, user) {
      return done(err, user);
    });
  }
));

module.exports = LocalPassport;
module.exports = OAuth2Passport;
module.exports = SteamPassport;