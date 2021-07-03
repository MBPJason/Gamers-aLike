require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("./config/passport/passport");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3001;
const MongoURI = process.env.MONGODB_URI || "mongodb://localhost/gamers-alike";

const app = express();

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
app.use(require("./controllers/AuthController.js"));

// Build path for domain launch
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Test Route to see if server is being seen
app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});
