// Dependencies
const tough = require('tough-cookie');
const Cookie = tough.Cookie;
const cookie = Cookie.parse(header);
const accessTokenSecret = process.env.SECRET;

// TODO: Put JWT inside a tough cookie, then use that cookie as verification then
// put the cookie as header. This will make a two step verification from Cookie to JWT 
// too provide access to user changing methods

// Authentication Process
module.exports = {
  setJWT: function (req, res, next) {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
  
      const token = authHeader.split(" ")[1];
  
      jwt.verify(token, accessTokenSecret, (err, user) => {
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

  
}
