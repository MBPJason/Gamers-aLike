const db = require("../../models");

const hopOnline = async (sessionID, userID, user, status, cb) => {
  const online = await db.Online.findOneAndUpdate(
    { userID: userID },
    {
      sessionID: sessionID,
      user: user,
      status: status,
    }
  );

  const sessionData = online.sessionInfo;
  console.log(sessionData);
  cb(sessionData);
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

const filterList = (playersArr) => {
  db.Session.find({ userID: { $in: playersArr } }, (err, players) => {
    if (err) {
      console.log(err);
      return;
    }
    const arr = [];
    players.forEach((player) => {
      arr.push(player.quickInfo);
    });
    return arr;
  });
};

module.exports = {
  hopOnline,
  addLobby,
  changeHost,
  filterList,
};
