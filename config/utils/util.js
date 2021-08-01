const db = require("../../models");

const hopOnline = async (sessionID, userID, socketID, user, status, cb) => {
  console.log("hopOnline function was called");
  console.log({ sessionID, userID, socketID, user, status });
  await db.Online.findOneAndUpdate(
    { userID: userID },
    {
      $set: {
        socketID: socketID,
        sessionID: sessionID,
        user: user,
        status: status,
      },
    },
    function (err, online) {
      console.log("Online Schema was looked through");
      console.log(err);
      console.log(online);
      if (err) {
        db.Online.create({
          socketID: socketID,
          sessionID: sessionID,
          userID: userID,
          user: user,
          status: status,
        }).then((online) => {
          console.log("Made onlineSchema for user");
          console.log(online);

          sessionInfo = online.sessionInfo;
          cb(sessionInfo);
        });
      } else if (online) {
        console.log("Found user's onlineSchema");
        console.log(online);

        sessionInfo = online.sessionInfo;
        cb(sessionInfo);
      }
    }
  );
};

const addLobby = (host, game, limit, public, headline, cb) => {
  db.Session.create(
    {
      Host: host,
      Game: game,
      UserLimit: limit,
      Public: public,
      Headline: headline,
    },
    (err, session) => {
      if (err) {
        cb(false);
      } else if (session) {
        cb(true, session);
      }
    }
  );
};

const changeHost = (session, host, cb) => {
  db.Session.findByIdAndUpdate(session, { Host: host }, (err) => {
    if (err) {
      cb(false);
    } else {
      cb(true);
    }
  });
};

module.exports = {
  hopOnline,
  addLobby,
  changeHost,
};
