require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("./config/passport/passport");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const { v4: uuidV4 } = require("uuid");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
});

const {
  hopOnline,
  addLobby,
  changeHost,
  filterList,
  updateArr,
  addInvite,
} = require("./config/utils/util");

const online = process.env.ONLINE_ROOM;
const PORT = process.env.PORT || 3001;
const MongoURI = process.env.MONGODB_URI || "mongodb://localhost/gamers-alike";

// TODO: Make sure that proxy is set on client's package.json to the port

// Express Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(flash());
app.use(express.static("client/build"));

// CORS Middleware
app.use(cors());

// Mongoose Middleware
mongoose.connect(MongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Mongoose/MongoDB Connection
const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose successfully connected.");
});

connection.on("error", (err) => {
  console.log("Mongoose connection error: ", err);
});

// Passport Middleware
app.use(passport.initialize());

// Routes
app.use(require("./controllers/AuthController"));
app.use(require("./controllers/UserController"));

// Build path for domain launch
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Test Route to see if server is being seen
app.get("/config", (req, res) => {
  res.json({
    success: true,
  });
});

let count = 0;
let playersMetList; // Database IDs
let friendsList; // Database IDs
let ignoreList; // Database IDs
let invitesList; // Session IDs
let friendsInvitesList; // Session IDs

// SocketIO Event listeners
io.on("connection", (socket) => {
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
    await hopOnline(id, dbId, user, status, (data) => {
      console.log("online schema found and updated");
      // Assign socket value
      socket.username = data.user.username;
      socket.userAvatar = data.user.userAvatar;
      socket.userRoom = id;
      socket.status = status;
      socket.ratings = data.user.ratings;
      socket.currentGame = data.user.currentGame;

      // Assign Lists
      friendsList = data.friends;
      playersMetList = data.playersMet;
      ignoreList = data.ignore;
      invitesList = data.invites;
      friendsInvitesList = data.friendsInvites;
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
    const fListRooms = [];
    const pmList = [];
    const invList = [];
    const onlineF = filterList(friendsList);
    const onlinePM = filterList(playersMetList);

    // Check if an array of friends users was returned
    if (onlineF !== undefined || null) {
      // If not loop through array given and check for online room and hidden status
      await onlineF.forEach((item) => {
        if (io.sockets.adapter.rooms.has(item.sessionID) && item.status) {
          // If room exists and not hidden throw to client online
          fList.push({ user: item, online: true });
        } else {
          // If room doesn't exists or user is hidden throw to client offline
          fList.push({ user: item, online: false });
        }
        fListRooms.push(item.sessionID);
      });
      // Send list of users
      io.to(socket.userRoom).emit("getFriends", fList);
    } else {
      io.to(socket.userRoom).emit("getFriends", []);
    }

    io.to(fListRooms).emit("updateFriend", {
      user: {
        sessionID: socket.userRoom,
        username: socket.username,
        userAvatar: socket.userAvatar,
        currentGame: socket.currentGame,
        status: socket.status,
      },
      online: socket.status,
    });

    // Check if an array of "players met" users was returned
    if (onlinePM !== undefined || null) {
      // If not loop through array given and check for online room and hidden status
      await onlinePM.forEach((item) => {
        if (io.sockets.adapter.rooms.has(item.sessionID) && item.status) {
          // If room exists and not hidden throw to client online
          pmList.push({ user: item, online: true });
        } else {
          // If room doesn't exists or user is hidden throw to client offline
          pmList.push({ user: item, online: false });
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

  // Update friends sessionIDs

  // Client pops a user out of the array type and send the new array down
  socket.on("deleteItem", (arr, type) => {
    updateArr(socket.userRoom, arr, type, (bool, data) => {
      if (bool) {
        switch (type) {
          case "invites":
            invitesList = data;
            break;
          case "friends":
            friendsList = data;
            break;
          case "playersMet":
            playersMet = data;
            break;
          case "friendsInvites":
            friendsInvitesList = data;
            break;
          default:
            ignoreList = data;
        }
        io.to(socket.userRoom).emit("success", "Removed");
      } else {
        io.to(socket.userRoom).emit("error", "Couldn't remove user");
      }
    });
  });

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
    const ignore = filterList(ignoreList);
    // Check user against ignore list
    const check = ignore.forEach((user) => {
      if (user.sessionID === id) {
        return false;
      }
    });

    if (!check) {
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
        const session = uuidV4();
        socket.currentSession = session;
        socket.join([session, gameLobbies]);
        io.to(session).emit("sessionRules", {
          sessionId: sessionRoom,
          rules: data,
        });
        io.to(gameLobbies).emit("gameLobbies", {
          lobbies: io.sockets.adapter.rooms.get(gameLobbies),
        });
      } else {
        socket.emit("error", {
          message: "Couldn't make session lobby",
        });
      }
    });
  });

  socket.on("changeHost", (game) => {
    socket.leave(game);
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

  socket.on("disconnect", () => {
    console.log(`${socket.id} socket disconnected`);
    //  function for turning sessionID, socketID, and status to null
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
});

// Socket.io and Express Routes listening PORT
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
