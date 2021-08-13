const { v4: uuidV4 } = require("uuid");
const online = process.env.ONLINE_ROOM;
const {
  hopOnline,
  addLobby,
  changeHost,
  filterList,
  updateArr,
  addInvite,
} = require("../config/utils/util");

let count = 0;

module.exports = (socket, io) => {
  count++;
  console.log(count);
  console.log(socket.id);

  /** Socket Knowledge
   * "ON": An event listener that is called too do something. Generally the catcher
   * "EMIT": Meant to send data to an "ON" event listener of the same name. Generally the "thrower"
   */

  /** MAIN FUNCTION
   * Gets called when the website loads and there is a user provided
   * Gets called when there is a update to the user state on the client side
   */
  socket.on("online", async ({ id, dbId, user, status }) => {
    await hopOnline(id, dbId, user, status, (data, playerID) => {
      console.log("online schema found and updated");
      // Assign socket value
      socket.username = data.user.username;
      socket.userAvatar = data.user.userAvatar;
      socket.userRoom = id;
      socket.status = status;
      socket.ratings = data.user.ratings;
      socket.currentGame = data.user.currentGame;
      socket.playerID = playerID;
    });

    // Join personal room and online
    socket.join([online, socket.userRoom]);

    // Emit to online that you have joined
    socket.to(online).emit("userJoined", {
      id: socket.userRoom,
      username: socket.username,
    });

    // Grab friends and players met list
    const fList = [];
    const fListRooms = []; // List of friends socket rooms
    const pmList = [];
    const invList = [];
    const onlineF = filterList(playerID, "friends");
    const onlinePM = filterList(playerID, "playersMet");

    // Check if an array of friends users was returned
    if (onlineF !== undefined || null) {
      // If not loop through array given and check for online room and hidden status
      await onlineF.forEach((friend) => {
        if (io.sockets.adapter.rooms.has(friend.sessionID)) {
          // If room exists throw to client as is
          fList.push(friend);
        } else {
          // If room doesn't exists set friend status to false and throw to client friend is offline
          friend.status = false;
          fList.push(friend);
        }
        // Looping through and adding friends socket rooms
        fListRooms.push(item.sessionID);
      });
      // Send list of users
      io.to(socket.userRoom).emit("getFriends", fList);
    } else {
      io.to(socket.userRoom).emit("getFriends", []);
    }

    // Update the client friends' list
    io.to(fListRooms).emit("updateFriend", {
      sessionID: socket.userRoom,
      username: socket.username,
      userAvatar: socket.userAvatar,
      currentGame: socket.currentGame,
      status: socket.status,
    });

    // Check if an array of "players met" users was returned
    if (onlinePM !== undefined || null) {
      // If not loop through array given and check for online room and hidden status
      await onlinePM.forEach((player) => {
        if (io.sockets.adapter.rooms.has(player.sessionID)) {
          // If room exists throw to client the player
          pmList.push(player);
        } else {
          // If room doesn't exists or user is hidden throw to client offline
          player.status = false;
          pmList.push(player);
        }
      });
      // Send list of users
      io.in(socket.userRoom).emit("getPlayersMet", pmList);
    } else {
      io.in(socket.userRoom).emit("getPlayersMet", []);
    }

    // Check for invites
    if (invitesList.length === 0) {
      // If none send up empty array
      io.in(socket.userRoom).emit("getInvites", []);
    } else {
      // If there is something, loop through and check for a room
      await invitesList.forEach((invite) => {
        if (io.sockets.adapter.rooms.has(invite.session)) {
          // Find a room and push it new array
          invList.push(invite);
        }
      });
      // Send active invites array to client
      io.in(socket.userRoom).emit("getInvites", invList);
      // Set server arr value to active arr list and then update Online Schema invites arr
      invitesList = invList;
      updateArr(socket.userRoom, invList, "invites");
    }

    const clients = io.sockets.adapter.rooms.get(online);
    // Test line of code. TODO: Remove from production
    io.in(socket.userRoom).emit("usersOnline", clients);
  });

  // Client pops a user out of the array type and send the new array down
  socket.on("deleteItem", ({ arr, type }) => {
    updateArr(socket.userRoom, arr, type, (bool, data) => {
      if (bool) {
        if (type == "invites") {
          invitesList = data;
        } else {
          friendsInvitesList = data;
        }

        io.to(socket.userRoom).emit("success", "Removed");
      } else {
        io.to(socket.userRoom).emit("error", "Couldn't remove user");
      }
    });
  });

  // ====================================
  //               Invites
  // ====================================

  // Send Session Invite
  socket.on("sendInvite", (targetID) => {
    io.to(targetID).emit("addInvite", {
      id: socket.userRoom,
      username: socket.username,
      userAvatar: socket.userAvatar,
      game: socket.currentGame,
      session: socket.sessionRoom,
    });
  });

  // Receive invite
  socket.on("addInvite", ({ id, username, userAvatar, game, session }) => {
    // Generate ignore list
    const ignore = filterList(socket.playerID, "ignore");
    // Check user against ignore list
    const check = ignore.forEach((user) => {
      if (user.sessionID === id) {
        return false;
      }
    });

    if (check === false) {
      io.in(id).emit("success", "Invite sent");
    } else {
      addInvite(
        socket.userRoom,
        id,
        username,
        userAvatar,
        game,
        session,
        (bool, data) => {
          if (bool) {
            io.to(socket.userRoom).emit("getInvites", data);
            io.to(id).emit("success", "Invite sent");
          } else {
            io.to(id).emit("error", "Couldn't send invite");
          }
        }
      );
    }
  });

  socket.on("acceptInvite", (session, arr) => {
    if (io.sockets.adapter.rooms.has(session)) {
      io.to(socket.userRoom).emit("joinLobby", session);
    } else {
      io.to(socket.userRoom).emit("error", "Lobby is closed");
    }

    io.to(socket.userRoom).emit("deleteItem", { arr: arr, type: "invite" });
  });

  // ========================================
  //               Lobbies
  // ========================================

  // Get game lobbies
  socket.on("getLobbies", (game) => {
    const lobbies = io.sockets.adapter.rooms.get(game + " Lobbies");
    io.to(socket.userRoom).emit("Lobbies", lobbies);
  });

  // Make a lobby
  socket.on("makeLobby", ({ host, game, limit, public, headline }) => {
    addLobby(host, game, limit, public, headline, (bool, data) => {
      if (bool) {
        const gameLobbies = game + " Lobbies";
        const gameLobby = uuidV4();
        socket.gameLobby = gameLobby;
        socket.join([gameLobby, gameLobbies]);
        io.to(gameLobby).emit("sessionRules", {
          sessionId: sessionRoom,
          filters: data,
        });
        io.to(gameLobbies).emit("gameLobbies", {
          lobby: gameLobby,
          filters: data,
        });
      } else {
        socket.emit("error", {
          message: "Couldn't make session lobby",
        });
      }
    });
  });

  socket.on("joinLobby", (session) => {
    socket.session = session;
    socket.join(session);
  });

  socket.on("leaveLobby", () => {
    socket.leave(socket.session);
  });

  // ======================================
  //          Inside Lobbies/Chat
  // ======================================

  //
  socket.on("changeHost", (game) => {
    socket.leave(socket.session);
  });

  socket.on("newHost", ({ host, preHost, session, game }) => {
    changeHost(session, host, (bool) => {
      if (bool) {
        const gameLobbies = game + " Lobbies";
        socket.join(gameLobbies);
        socket.to(preHost).emit("changeHost", gameLobbies);
      } else {
        socket.emit("error", {
          message: "Couldn't change hosts",
        });
      }
    });
  });

  // Send message to users in lobby
  socket.on("sendMessage", (message) => {
    io.to(socket.session).emit("message", message);
  });

  // ====================================
  //        Disconnect and Errors
  // ====================================

  socket.on("disconnect", () => {
    console.log(`${socket.id} socket disconnected`);
    //  function for turning sessionID, socketID, and status to null
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
};
