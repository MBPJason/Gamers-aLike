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
let playersMetList; // TODO: update when session gets confirmed
let quickPlayList;
let ignoreList;

// SocketIO Event listeners
io.on("connection", (socket) => {
  count++;
  console.log(count);
  console.log(socket.id);

  /** Socket Knowledge
   * "ON": An event listener that is called too do something. Generally the catcher
   * "EMIT": Meant to send data to an "ON" event listener of the same name. Generally the "thrower"
   */

  socket.on("online", async ({ id, dbId, user, status }) => {
    await hopOnline(id, dbId, user, status, (data) => {
      console.log("online schema found and updated");
      // Assign socket value
      socket.username = data.user.username;
      socket.userRoom = id;
      socket.status = status;
      socket.ratings = data.user.ratings;
      socket.currentGame = data.user.currentGame;

      // Assign Lists
      quickPlayList = data.quickplay;
      playersMetList = data.playersMet;
      ignoreList = data.ignore;
    });

    // Join personal room and online
    socket.join([online, id]);

    // Emit to online that you have joined
    socket.broadcast
      .to(online)
      .emit("userJoined", { id: socket.userRoom, username: socket.username });

    // Grab quickplay and players met list
    const qpList = [];
    const pmList = [];
    const onlineQP = filterList(quickPlayList);
    const onlinePM = filterList(playersMetList);

    // Check if an array of quickplay users was returned
    if (onlineQP !== undefined || null) {
      // If not loop through array given and check for online room and hidden status
      await onlineQP.forEach((item) => {
        if (io.sockets.adapter.rooms.has(item.sessionID) && item.status) {
          // If room exists and not hidden throw to client online
          qpList.push({ user: item, online: true });
        } else {
          // If room doesn't exists or user is hidden throw to client offline
          qpList.push({ user: item, online: false });
        }
      });
      // Send list of users
      io.to(socket.userRoom).emit("getQuickPlay", qpList);
    } else {
      io.to(socket.userRoom).emit("getQuickPlay", []);
    }

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
      io.to(socket.userRoom).emit("getPlayersMet", pmList);
    } else {
      io.to(socket.userRoom).emit("getPlayersMet", []);
    }
    const clients = io.sockets.adapter.rooms.get(online);
    // Test line of code. TODO: Remove from production
    io.to(id).emit("usersOnline", clients);
  });

  socket.on("getLobbies", (game) => {
    const lobbies = io.sockets.adapter.rooms.get(game + " Lobbies");
    io.to(id).emit("Lobbies", lobbies);
  });

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
