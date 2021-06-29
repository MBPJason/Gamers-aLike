// Dependencies
const jwt = require("jsonwebtoken");
const tokenSecret = process.env.SECRET;
const fs = require("fs");
const path = require("path");
const db = require("../../models");

const pathToPriv = path.join(__dirname, "..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToPriv, "utf8");

const pathToPub = path.join(__dirname, "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToPub, "utf8");

// TODO: Put JWT inside a tough cookie, then use that cookie as verification then
// put the cookie as header. This will make a two step verification from Cookie to JWT
// too provide access to user changing methods

// Authentication Process
module.exports = {
  checkJWT: function (req, res, next) {
    const authHeader = req.headers.authorization;
    const userID = req.user.sub;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, PUB_KEY, (err, decoded) => {
        if (err) {
          return res.sendStatus(403);
        } else {
          db.User.findById(userID, (err, user) => {
            if (err) {
              return res.sendStatus(404);
            }

            if (user) {
              const authToken = decoded + "." + user.authProof;
              jwt.verify(authToken, PRIV_KEY, (err, proof) => {
                if (err) {
                  return res.sendStatus(403);
                } else {
                  next();
                }
              });
            }
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  },

  authJWT: async function (user, expire) {
    try {
      if (user) {
        const user = user;
        const expiresIn = expire || "1d";
        const payload = {
          sub: user._id,
          iat: Date.now(),
        };

        const signedToken = jwt.sign(payload, PRIV_KEY, {
          expiresIn: expiresIn,
          algorithm: "RS256",
        });
        const authHeader = signedToken.split(".")[0];
        const authPayload = signedToken.split(".")[1];
        const splitTokenSignature = signedToken.split(".")[2];

        const splitTokenPayload = {
          authToken: authHeader + "." + authPayload,
        };

        const signedSplitPayload = jwt.sign(splitTokenPayload, PUB_KEY, {
          expiresIn: expiresIn,
          algorithm: "RS256",
        });

        await db.User.findOneAndUpdate(
          { _id: user._id },
          { authProof: splitTokenSignature }
        );

        return signedSplitPayload;
      } else {
        console.log("No user info found");
        new Error({ message: "No user info given" });
      }
    } catch (err) {
      console.log(err);
      return new Error({ message: "No user info given" });
    }
  },
};
