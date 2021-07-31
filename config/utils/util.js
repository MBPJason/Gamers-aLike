const db = require("../../models/index");

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
  addLobby,
  changeHost,
};
