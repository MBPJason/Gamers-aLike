// Dependencies
const tough = require("tough-cookie");
const Cookie = tough.Cookie;
const jwt = require("jsonwebtoken");
const tokenSecret = process.env.SECRET;

// TODO: Put JWT inside a tough cookie, then use that cookie as verification then
// put the cookie as header. This will make a two step verification from Cookie to JWT
// too provide access to user changing methods

// Authentication Process
module.exports = {
  checkJWT: function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, tokenSecret, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }

        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  },

  setJWT: function (req, res, next) {
    try {
      if (req.user) {
        console.log("User data acquired");
        const user = req.user;
        const token = {
          userId: user._id,
          username: user.username,
          discordTableId: user.DiscordInfo,
          gamerTagsTableId: user.GamerTags,
          playerTableId: user.PlayersInfo,
          ratingsTableId: user.Ratings,
        };

        const payload = jwt.sign(
          {
            data: token,
          },
          tokenSecret,
          { expiresIn: "1m" }
        );

        const basic = `Basic ${payload}`;
        console.log(basic);

        try {
          // TODO: Put auth headers in correct location. Use website for an example: https://medium.com/dev-bits/a-guide-for-adding-jwt-token-based-authentication-to-your-single-page-nodejs-applications-c403f7cf04f4
          res.setHeader("Authorization", basic);
          next();
        } catch (err) {
          console.log(err);
          res.json({
            error: true,
            data: err,
            message: "Couldn't set responses.",
          });
        }
      } else {
        res.json({ message: "No user info found" });
        res.sendStatus(404);
      }
    } catch (err) {
      console.log(err);
      res
        .json({
          error: true,
          data: err,
          message: "Something went wrong server side.",
        })
        .sendStatus(500);
    }
  },
};
