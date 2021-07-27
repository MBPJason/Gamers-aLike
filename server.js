require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("./config/passport/passport");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
  allowEIO3: true,
});
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
let count = 0;
// Socket.IO
io.on("connection", (socket) => {
  count++;
  console.log(count);

  /** Socket Knowledge
   * "ON": Meant to listen for that event that is called and do something. Generally the catcher
   * "EMIT": Meant to send data to an "ON" event listener. Generally the "thrower"
   */

  socket.on("online", ({ id }) => {
    console.log(`I see you user: ${id}`);
    socket.join(online);
    let clientsInRoom
    if (io.sockets.adapter.rooms.has(online))
      clientsInRoom = io.sockets.adapter.rooms.get(online).size
    console.log(io.sockets.adapter.rooms.get(online).sockets);
    io.to(online).emit("usersOnline", {
      clients: clientsInRoom || "none",
    });
  });
});

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

// Socket.io and Express Routes listening PORT
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
