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

const changeHost = async (session, host, cb) => {
  await db.Session.findByIdAndUpdate(session, { Host: host }, (err) => {
    if (err) {
      cb(false);
    } else {
      cb(true);
    }
  });
};

const filterList = async (playersArr) => {
  await db.Session.find({ userID: { $in: playersArr } }, (err, players) => {
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

// Updates client array via type pointer
const updateArr = async (id, arr, type) => {
  await db.Session.findOneAndUpdate({ sessionID: id }, { [type]: arr });
};

const addInvite = (targetID, id, username, userAvatar, sessionRoom, cb) => {
  let invite = {
    id: id,
    username: username,
    userAvatar: userAvatar,
    session: sessionRoom,
    seen: false,
    dateCreated: new Date(),
  };
  db.Session.findOne({ sessionID: targetID }, async (err, user) => {
    if (err) {
      cb(false);
    } else if (user.invites.length === 0) {
      user.invites.push(invite);
      user = await user.save();
      cb(true, user.invites);
    } else {
      await user.invites.forEach((item) => {
        if (item.username === username) {
          item.id = id;
        }
      });
      user.invites.push(invite);
      user = await user.save();
      cb(true, user.invites);
    }
  });
};

module.exports = {
  hopOnline,
  addLobby,
  changeHost,
  filterList,
  updateArr,
  addInvite,
};
