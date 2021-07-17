import axios from "axios";
import { jsonwebtoken as jwt } from "jsonwebtoken";
const { SECRET } = process.env;

const API = {
  // ===================================================================================
  //                        SIGNUP AND LOGIN RELATED FUNCTIONS
  // ===================================================================================
  async login(email, password, expire, type) {
    console.log("Login called");
    return await axios
      .post("http://localhost:3000/auth/local/login", {
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
    axios.get("http://localhost:3000/validate-cookies").then((res) => {
      if (res.status !== 200) {
        history.push("/login");
      } else if (res.status !== 200) {
        setUser(user);
        setJWT(authToken);
        history.push("/home");
      }
    });
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
