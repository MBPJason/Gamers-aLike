import axiosConfig from "./AxiosHeaders";
import jwt from "jsonwebtoken";
const { SECRET } = process.env;

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
        let user = res.data.userToken;
        return user;
      });
  },

  async signup(
    expire,
    type,
    username,
    email,
    password,
    discordID,
    steamID,
    battlenetID,
    playStationID,
    xboxID
  ) {
    return await axiosConfig
      .post("/auth/login", {
        expire,
        type,
        username,
        email,
        password,
        discordID,
        steamID,
        battlenetID,
        playStationID,
        xboxID,
      })
      .then((res) => {
        let user = res.body.userToken;
        return user;
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
    setJWT(authToken);
    // const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
    axiosConfig
      .get("/validate-cookies", {
        headers: { 'Authorization': `Bearer ${authToken}` },
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

  async getUserInfo(id) {
    return await axiosConfig.get(`/api/user/${id}`).then((res) => {
      const decoded = jwt.verify(res.body.userInfo, SECRET);
      return decoded;
    });
  },
};

export default API;
