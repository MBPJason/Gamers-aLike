import axiosConfig from "./AxiosHeaders";
import axios from "axios";
import Cookies from "js-cookie";

const API = {
  // ===================================================================================
  //                        SIGNUP AND LOGIN RELATED FUNCTIONS
  // ===================================================================================

  // Local login Method
  async login(email, password, expire, type) {
    console.log("Login called");
    return await axiosConfig
      .post("/auth/local/login", {
        email,
        password,
        expire,
        type,
      })
      .then((res) => {
        console.log(res);
        let user = res.data.user;
        return user;
      });
  },

  // Local sign up method
  async signup(
    setUser,
    setJWT,
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
    XboxID
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
          setUser(res.data.user);
          setJWT(Cookies.get("__AUTH").split(":")[1]);
          history.push("/home");
        }
      })
      .catch((error) => {
        console.log(error);
        history.push("login");
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
        if (res.status !== 200) {
          setJWT("");
          history.push("/login");
        } else if (res.status === 200) {
          setUser(user);
          history.push("/home");
        }
      });
  },

  finishingTouches(
    setUser,
    history,
    email,
    username,
    password,
    DiscordID,
    SteamID,
    BattlenetID,
    PlayStationID,
    XboxID
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
        setUser(res.data.user);
        history.push("/home");
      });
  },
  // =====================================================================================
  //                                          END
  // =====================================================================================

  getUserInfo(setUser, setJWT, setIsLoggedIn, history) {
    axiosConfig
      .get("/api/userInfo")
      .then(async (res) => {
        if (res.status !== 200) {
          setJWT("");
          await axios.get("/auth/logout");
          history.push("/login");
        } else if (res.status === 200) {
          setIsLoggedIn(true);
          setUser(res.data.user);
          if (history) {
            history.push("/home");
          }
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
