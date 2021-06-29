const bcrypt = require("bcrypt");
const db = require("../../models");

// Making a user for non local sign ups
const makeUser = async function (caller, identifier, profile, err) {
    console.log("Making a user");
  
    // Main build process for making an account
  
    // Try/Catch block for potential server side errors
    try {
      let userIdentifier = profile.id || identifier;
  
      // Main User Schema built with user required parameters
      const user = await db.User.create({
        [caller]: userIdentifier,
      });
  
      // Building out User essential Schemas
      const Ratings = await db.Ratings.create({
        userID: user._id,
        RatingsScore: 1,
      });
      const PlayersInfo = await db.Players.create({
        userID: user._id,
      });
      const DiscordInfo = await db.Discord.create({
        userID: user._id,
      });
      const GamerTags = await db.Gamertags.create({
        userID: user._id,
      });
  
      // Updating/Tying it to new User created Schema
      await db.User.findByIdAndUpdate(user._id, {
        Ratings: Ratings._id,
        PlayersInfo: PlayersInfo._id,
        DiscordInfo: DiscordInfo._id,
        GamerTags: GamerTags._id,
      });
  
      // Checks for Steam and non Steam Sign Up
      if (caller === "Steam") {
        await db.Gamertags.findByIdAndUpdate(GamerTags._id, {
          SteamID: identifier._id,
        });
      } else {
        await db.User.findByIdAndUpdate(user._id, {
          email: profile.email,
        });
      }
  
      // Sends built user as end result
      return user;
    } catch (error) {
      console.log(error);
      return (err = {
        error: true,
        data: error,
        message: "Something went wrong",
      });
    }
  };
  



  //--------------------------------
  //       LOCAL MAKE USER
  //--------------------------------
  const localMakeUser = async function (
    email,
    username,
    password,
    DiscordID,
    SteamID,
    BattlenetID,
    PlayStationID,
    XboxID
  ) {
    // Try/Catch block for potential server side errors
    try {
      // Hash and salt password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Main User Schema built with user required parameters
      const user = await db.User.create({
        email: email,
        username: username,
        password: hashedPassword,
      });
      console.log("Local user is made");
      // Building out User essential Schemas
      const Ratings = await db.Ratings.create({
        userID: user._id,
        RatingsScore: 1,
      });
      const PlayersInfo = await db.Players.create({
        userID: user._id,
      });
      const DiscordInfo = await db.Discord.create({
        userID: user._id,
      });
      const GamerTags = await db.Gamertags.create({
        userID: user._id,
      });
      console.log("Made local user required schemas");
  
      // Updating/Tying it to new User created Schema
      await db.User.findByIdAndUpdate(user._id, {
        Ratings: Ratings._id,
        PlayersInfo: PlayersInfo._id,
        DiscordInfo: DiscordInfo._id,
        GamerTags: GamerTags._id,
      });
      console.log("Attaching required schemas to local user");
      // Update Discord table if user provides a DiscordID
      if (DiscordID) {
        await db.Discord.findByIdAndUpdate(DiscordInfo._id, {
          DiscordID: DiscordID,
        });
      }
  
      // Update Gamertags table check if any gamertags were given in signup process
      if (SteamID) {
        await db.Gamertags.findByIdAndUpdate(GamerTags._id, {
          SteamID: SteamID,
        });
      }
      if (BattlenetID) {
        await db.Gamertags.findByIdAndUpdate(GamerTags._id, {
          BattlenetID: BattlenetID,
        });
      }
      if (PlayStationID) {
        await db.Gamertags.findByIdAndUpdate(GamerTags._id, {
          PlayStationID: PlayStationID,
        });
      }
      if (XboxID) {
        await db.Gamertags.findByIdAndUpdate(GamerTags._id, { XboxID: XboxID });
      }
      console.log("Finished checks for additional local user data");
  
      // If everything is done correctly this is the response back
      const fullUser = await db.User.findById(user._id);
      return fullUser;
    } catch (error) {
      // If server side error this is the error response
      console.log(error);
      return (err = {
        error: true,
        data: false,
        message: "Something went wrong with the server",
      });
    }
  };

  module.exports.makeUser = makeUser;
  module.exports.localMakeUser = localMakeUser;