import axiosConfig from "./AxiosHeaders";

const API = {
  // ===================================================================================
  //                        SIGNUP AND LOGIN RELATED FUNCTIONS
  // ===================================================================================

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

  async signup(
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
    return await axiosConfig
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
        let user = res.body.userToken;
        return user;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  facebookPassport() {
    axiosConfig.get("/auth/facebook");
  },

  googlePassport() {
    axiosConfig.get("/auth/google");
  },

  twitterPassport() {
    axiosConfig.get("/auth/twitter");
  },

  steamPassport() {
    axiosConfig.get("/auth/steam");
  },

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
        console.log(res.config);
      });
  },
  // =====================================================================================
  //                                          END
  // =====================================================================================

  getUserInfo(setUser, setJWT, history) {
    axiosConfig
      .get(`/api/userInfo`)
      .then(async (res) => {
        if (res.status !== 200) {
          setJWT("");
          await axiosConfig.get("/auth/logout");
        } else if (res.status === 200) {
          setUser(res.data.user);
          history.push("/home");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default API;
