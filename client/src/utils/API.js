import axiosConfig from "./AxiosHeaders";
import axios from "axios";

const API = {
  // ===================================================================================
  //                        SIGNUP AND LOGIN RELATED FUNCTIONS
  // ===================================================================================

  // Local login Method
  login(email, password, expire, type, cb) {
    console.log("Login called");
    axiosConfig
      .post("/auth/local/login", {
        email,
        password,
        expire,
        type,
      })
      .then((res) => {
        cb(true, res.data.user);
      })
      .catch(async (error) => {
        console.log(error);
        await axios.get("/auth/logout");
        cb(false);
      });
  },

  // Local sign up method
  async signup(
    history,
    expire,
    type,
    email,
    username,
    password,
    DiscordID,
    SteamID,
    BattlenetID,
    PlayStationID,
    XboxID,
    cb
  ) {
    axiosConfig
      .post("/auth/signup", {
        expire,
        type,
        email,
        username,
        password,
        DiscordID,
        SteamID,
        BattlenetID,
        PlayStationID,
        XboxID,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.user);
          cb(res.data.user);
        }
      })
      .catch(async (error) => {
        console.log(error);
        await axios.get("/auth/logout");
        history.push("/login");
      });
  },

  // Non local Sign Up/Login Methods
  facebookPassport() {
    axios.get("/auth/facebook");
  },

  googlePassport() {
    axios.get("/auth/google");
  },

  twitterPassport() {
    axios.get("/auth/twitter");
  },

  steamPassport() {
    axios.get("/auth/steam");
  },

  // Setting new and returning users in Contexts
  setUserContext(setUser, setJWT, user, authToken, history) {
    const cookieToken = authToken.split(".");
    const trueToken =
      cookieToken[0] + "." + cookieToken[1] + "." + cookieToken[2];
    setJWT(trueToken);
    // const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
    axiosConfig
      .get("/validate-cookies", {
        headers: { Authorization: `Bearer ${trueToken}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setUser(user);
          history.push("/home");
        }
      })
      .catch(async (error) => {
        console.log(error);
        await axios.get("/auth/logout");
        history.push("/login");
      });
  },

  finishingTouches(
    history,
    email,
    username,
    password,
    DiscordID,
    SteamID,
    BattlenetID,
    PlayStationID,
    XboxID,
    cb
  ) {
    axios
      .put("/api/user/finishing-touches", {
        email,
        username,
        password,
        DiscordID,
        SteamID,
        BattlenetID,
        PlayStationID,
        XboxID,
      })
      .then((res) => {
        cb(res.data.user);
      })
      .catch(async (error) => {
        console.log(error);
        await axios.get("/auth/logout");
        history.push("/login");
      });
  },
  // =====================================================================================
  //                                          END
  // =====================================================================================

  getUserInfo(history, cb) {
    axiosConfig
      .get("/api/userInfo")
      .then(async (res) => {
        if (res.status !== 200) {
          await axios.get("/auth/logout");
          return history.push("/");
        } else if (res.status === 200) {
          return cb(res.data.user);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  updateUser(setUser, setJWT, history, id) {
    axiosConfig.post("/api/update/user", {
      params: {
        id: id,
      },
    });
  },
};

export default API;
