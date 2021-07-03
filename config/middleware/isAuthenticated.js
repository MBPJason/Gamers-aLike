// Dependencies
require("dotenv").config();
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const db = require("../../models");
const bcrypt = require("bcrypt");

// Client Keys
const pathToCPriv = path.join(__dirname, "../../jwtRS256.key");
const CLIENT_PRIV_KEY = fs.readFileSync(pathToCPriv, "utf8");
const pathToCPub = path.join(__dirname, "../../jwtRS256.key.pub");
const CLIENT_PUB_KEY = fs.readFileSync(pathToCPub, "utf8");

// Sever Keys
const pathToSPriv = path.join(__dirname, "../../jwtServerRS256.key");
const SERVER_PRIV_KEY = fs.readFileSync(pathToSPriv, "utf8");
const pathToSPub = path.join(__dirname, "../../jwtServerRS256.key.pub");
const SERVER_PUB_KEY = fs.readFileSync(pathToSPub, "utf8");

// Authentication Process and Checks
module.exports = {
  checkJWT(req, res, next) {
    // Pull in headers and user from request
    const authHeader = req.headers.authorization;
    const user = req.user;

    // Check if there is a header
    if (authHeader) {
      // Extract the token from the header
      const token = authHeader.split(" ")[1];

      // Verify token from header with client paired public key
      jwt.verify(token, CLIENT_PUB_KEY, (err, decoded) => {
        // Error check
        if (err) {
          // Error response
          return res.sendStatus(403);
        } else {
          // Check if there was a serialized user in request
          if (user) {
            // Construct true token with user spilt signature from User Schema
            const authToken = decoded.authToken + "." + user.authProof;
            // Verify true token with server paired public key
            jwt.verify(authToken, SERVER_PUB_KEY, (err, proof) => {
              // Error check
              if (err) {
                // Error response
                return res.sendStatus(403);
              } else {
                // If it checks out set req.user and go to next middleware function
                req.user = user;
                next();
              }
            });
          } else {
            // If no serialized user respond with a 404 code
            res.sendStatus(404);
          }
        }
      });
    } else {
      res.sendStatus(401);
    }
  },

  // Auth Split Token Method
  async authJWT(user, expire) {
    // Try catch block for server side errors and function errors
    try {
      // Check if user parameter is was given
      if (user) {
        const expiresIn = expire || "5m"; // Pulls expire parameter or sets jwt to last for a day

        // Sets up token value
        const payload = {
          sub: user._id,
          iat: Date.now(),
          expires: expiresIn,
        };

        /**
         * Part one of the spilt token setup
         * Take payload and sign it with the server private key(RS256)
         */
        const signedToken = jwt.sign(payload, SERVER_PRIV_KEY, {
          expiresIn: expiresIn,
          algorithm: "RS256",
        });

        /**
         * Split the token via "." into 3 parts.
         * Header
         * Payload
         * Signature
         */
        const authHeader = signedToken.split(".")[0];
        const authPayload = signedToken.split(".")[1];
        const splitTokenSignature = signedToken.split(".")[2];

        // Combine the header and payload and put it into an object
        const splitTokenPayload = {
          authToken: authHeader + "." + authPayload,
          sub: user._id,
          username: user.username,
        };

        // Take the new object and sign it with the public key(RS256) and make a new token
        const signedSplitPayload = jwt.sign(
          splitTokenPayload,
          CLIENT_PRIV_KEY,
          {
            expiresIn: expiresIn,
            algorithm: "RS256",
          }
        );

        // Add spilt signature onto user schema
        await db.User.findOneAndUpdate(
          { _id: user._id },
          { authProof: splitTokenSignature }
        );

        // Return new publicly signed token
        return signedSplitPayload;
      } else {
        // If no user gave then give out error
        console.log("No user info found");
        new Error({ message: "No user info given" });
      }
    } catch (err) {
      // If server error display error
      console.log(err);
      return new Error(
        "Something went wrong on the server end or executing the function"
      );
    }
  },

  async validateCookie(req, res, next) {
    try {
      const { signedCookies } = req;

      if ("special" in signedCookies) {
        const cookieCheck = bcrypt.compare(
          process.env.COOKIE_CRYPTO,
          signedCookies.special
        );

        if (cookieCheck) {
          next();
        } else {
          res.status(403).json({ message: "You are not allowed access" });
        }
      } else {
        res
          .status(403)
          .json({
            message:
              "Couldn't find authorization check. You are not allowed access",
          });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
