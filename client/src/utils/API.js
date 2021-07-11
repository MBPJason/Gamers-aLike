import axios from "axios";
import { jsonwebtoken as jwt } from "jsonwebtoken";
const { SECRET } = process.env;

const API = {
  // ===================================================================================
  //                        SIGNUP AND LOGIN RELATED FUNCTIONS
  // ===================================================================================
  async login(email, password, expire, type) {
    return await axios
      .post("/auth/login", { email, password, expire, type })
      .then((res) => {
        let user = res.body.userToken;
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
    return await axios
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

  async facebookSignup() {
    return await axios.get("/auth/facebook/callback").then((res) => {
      let user = res.body.userToken;
      return user;
    });
  },

  async googleSignup() {
    return await axios.get("/auth/google/callback").then((res) => {
      let user = res.body.userToken;
      return user;
    });
  },

  async twitterSignup() {
    return await axios.get("/auth/twitter/callback").then((res) => {
      let user = res.body.userToken;
      return user;
    });
  },

  async steamSignup() {
    return await axios.get("/auth/steam/callback").then((res) => {
      let user = res.body.userToken;
      return user;
    });
  },

  setUserContext(setUser, setJWT, user, authToken, history) {
    const decoded = jwt.verify(authToken, SECRET);
    if (user.userID === decoded.userID) {
      setUser(user);
      setJWT(authToken);
      history.push("/home");
    } else {
      history.push("/login");
      return new Error("Authentication couldn't be performed");
    }
  },
  // =====================================================================================
  //                                          END
  // =====================================================================================

  async getUserInfo(id) {
    return await axios.get(`/api/user/${id}`).then((res) => {
      const decoded = jwt.verify(res.body.userInfo, SECRET);
      return decoded;
    });
  },
};

export default API;
