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
  const playersList = await db.Players.findOne({ userID: userID });
  const sessionData = online.sessionInfo;
  console.log(sessionData, playersList._id);
  cb(sessionData, playersList._id);
};

const addLobby = (lobbyID, host, game, limit, public, headline, cb) => {
  db.Session.create(
    {
      LobbyID: lobbyID,
      Host: host,
      Game: game,
      UserLimit: limit,
      Public: public,
      Headline: headline,
    },
    (err, lobby) => {
      if (err) {
        cb(false);
      } else if (lobby) {
        cb(true, lobby);
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

const filterList = async (playerID, type) => {
  let arr = [];
  const list = await db.Players.findById(playerID, (err, players) => {
    if (err) {
      console.log(err);
      return;
    } else {
      return players;
    }
  })
    .populate("Online")
    .exec();

  switch (type) {
    case "ignore":
      list.ignore.forEach((player) => {
        arr.push(player.quickInfo);
      });
      break;
    case "playersMet":
      list.playersMet.forEach((player) => {
        arr.push(player.quickInfo);
      });
      break;
    default:
      list.friends.forEach((player) => {
        arr.push(player.quickInfo);
      });
  }

  return arr;
};

// Updates client array via type pointer
const updateArr = async (id, arr, type, cb) => {
  // If array is for invites then just normal update it
  if (type === "invites" || "friendsInvites") {
    const user = await db.Online.findOneAndUpdate(
      { sessionID: id },
      { [type]: arr }
    );
    cb(true, user.invites);
  } else {
    // If array isn't for invites then grab sessionIds and se
    db.Online.findOne({ sessionID: id }, async (err, user) => {
      let userIDs = [];
      let usernames = [];
      arr.forEach((item) => {
        usernames.push(item.username);
      });
      await db.Online.find(
        { "user.username": { $in: usernames } },
        (err, players) => {
          if (err) {
            cb(false);
          } else {
            players.forEach((player) => {
              userIDs.push(player.userID);
            });
          }
        }
      );

      user[type] = userIDs;
      user = await user.save();
      cb(true, user[type]);
    });
  }
};

const addInvite = (targetID, id, username, userAvatar, sessionRoom, cb) => {
  // Set Invite variable
  let invite = {
    id: id,
    username: username,
    userAvatar: userAvatar,
    session: sessionRoom,
    seen: false,
    dateCreated: new Date(),
  };

  // Find client's online schema
  db.Online.findOne({ sessionID: targetID }, async (err, user) => {
    // Error check
    if (err) {
      cb(false);
    }
    // If empty arr just push invite in
    else if (user.invites.length === 0) {
      user.invites.push(invite);
      user = await user.save();
      cb(true, user.invites);
    }
    // Loop through invite array, find any potential invites from sender
    // and ensure that sessionID is correct
    else {
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
