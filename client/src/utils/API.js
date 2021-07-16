import axios from "axios";
import { jsonwebtoken as jwt } from "jsonwebtoken";
const { SECRET } = process.env;

const API = {
  // ===================================================================================
  //                        SIGNUP AND LOGIN RELATED FUNCTIONS
  // ===================================================================================
  async login(email, password, expire, type) {
    return await axios
      .post("http://localhost:3000/auth/login", { email, password, expire, type })
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
      .post("http://localhost:3000/auth/login", {
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
    axios.get("http://localhost:3000/auth/facebook");
  },

  googlePassport() {
    axios.get("http://localhost:3000/auth/google");
  },

  twitterPassport() {
    axios.get("http://localhost:3000/auth/twitter");
  },

  steamPassport() {
    axios.get("http://localhost:3000/auth/steam");
  },

  setUserContext(setUser, setJWT, user, authToken, history) {
    const decoded = jwt.verify(authToken, SECRET);
    if (user.userID === decoded.userID) {
      setUser(user);
      setJWT(authToken);
      history.push("/home");
    } else {
      history.push("/login");
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
