require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("./config/passport/passport");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    upgrade: false,
    credentials: true,
  },
  allowEIO3: true,
});

const { hopOnline, addLobby, changeHost } = require("./config/utils/util");

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

// Socket.IO variables
let count = 0;
let sessionUser;
let userRoom;
let gameRoom;
let sessionRoom;
// Socket.IO Event listeners
io.on("connection", (socket) => {
  count++;
  console.log(count);
  console.log(socket.id)

  /** Socket Knowledge
   * "ON": An event listener that is called too do something. Generally the catcher
   * "EMIT": Meant to send data to an "ON" event listener of the same name. Generally the "thrower"
   */

  socket.on("online", ({ id, dbId, user, status }) => {
    console.log("User registering online");
    hopOnline(id, dbId, socket.id, user, status, (data) => {
      sessionUser = data;
      userRoom = id;
    });
    socket.join([online, userRoom]);
    const clients = io.sockets.adapter.rooms.get(online);
    io.to(userRoom).emit("usersOnline", clients);
  });

  socket.on("getLobbies", (game) => {
    const lobbies = io.sockets.adapter.rooms.get(game + " Lobbies");
    io.to(id).emit("Lobbies", lobbies);
  });

  socket.on("makeLobby", ({ host, game, limit, public, headline }) => {
    addLobby(host, game, limit, public, headline, (bool, data) => {
      if (bool) {
        const gameLobbies = game + " Lobbies";
        const session = uuidv4();
        sessionRoom = session;
        socket.join([session, gameLobbies]);
        io.to(sessionRoom).emit("sessionRules", {
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
    console.log(socket.id)
    console.log("socket disconnected");
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
