const db = require("../../models/index");

const hopOnline = (sessionID, userID, socketID, user, status, cb) => {
  db.Online.findOneAndUpdate(
    { userID: userID },
    { socketID: socketID, sessionID: sessionID, user: user, status: status },
    (err, online) => {
      if (err) {
        db.Online.create({
          socketID: socketID,
          sessionID: sessionID,
          userID: userID,
          user: user,
          status: status,
        }).then((online) => {
          cb(online.sessionInfo);
        });
      } else {
        cb(online.sessionInfo);
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
