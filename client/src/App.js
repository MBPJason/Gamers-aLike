// import logo from './logo.svg';
import "./App.css";
// import fs from "fs";
// import path from "path";

// React Dependencies
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { useCookies } from "react-cookie";

// Axios Dependencies
import { setAxiosDefaults } from "./utils/AxiosHeaders";
import axios from "axios";

// Context Dependencies
import UserContext from "./MyComponents/Context/UserContext";
import { jsonwebtoken as jwtMod } from "jsonwebtoken";

// Pages
import Landing from "./pages/LandingPage/Landing.jsx";
import Login from "./pages/AuthPages/LoginPage/LoginPage";
import SignUp from "./pages/AuthPages/SignUpPage/SignUpPage";
import Home from "./pages/HomePage/HomePage";
import Lobby from "./pages/LobbyPage/LobbyPage";
import Session from "./pages/SessionPage/SessionPage";

// const pathToCKey = path.join(__dirname, "../keys/jwtRS256.key.pub");
// const CLIENT_KEY = fs.readFileSync(pathToCKey, "utf8");
const jwtSecret = process.env.SECRET;
const CLIENT_KEY = process.env.CLIENT_KEY;

function App() {
  // Set up states
  const history = useHistory();
  const [cookies] = useCookies(["__AUTH", "user"]);
  const [user, setUser] = useState({});
  const [jwt, setJWT] = useState("");

  // On website load, look for cookies
  useEffect(() => {
    const auth = cookies.__AUTH;
    const userInfo = cookies.user;
    // If cookies are present, decoded auth
    if (auth && userInfo) {
      jwtMod.verify(auth.value, CLIENT_KEY, (err, decoded) => {
        if (err) {
          axios.get("/auth/logout"); // Error clear all cookies and login info
        } else if (decoded) {
          const decID = decoded.sub;
          const userID = userInfo.value.userID;
          if (decID === userID) {
            setJWT(auth); // If userID from user cookie and userID from auth cookie decoded match set auth value as jwt
          } else {
            axios.get("/auth/logout"); // Error clear all cookies and login info
          }
        }
      });
    } else {
      axios.get("/auth/logout"); // Error clear all cookies and login info
    }
  }, []); //Left empty to get initial value only once on first render

  // On website load second process, get user info
  useEffect(() => {
    // Check for jwt in state
    if (jwt) {
      // Set axios auth header with jwt token
      setAxiosDefaults(jwt);
      // Fetch user info
      axios.get("/api/userInfo").then((res) => {
        const userDecoded = jwtMod.verify(res.body.user, jwtSecret); // Decode response jwt
        setUser(userDecoded); // set user with decoded user info
        history.push("/home"); // send user to home page
      });
    }
  }, []); //Left empty to get initial value only once on first render

  // TODO: potential check for cookie and/or local storage item for sign up to automatically redirect for easier sign up

  return (
    <>
      <Router>
        <UserContext.Provider value={{ user, setUser, jwt, setJWT }}>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/finishing-touch' component={SignUp} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/home' component={Home} />
            <Route path='/:username/profile' component={Landing} />
            <Route path='/lobby' component={Lobby} />
            <Route path='/session' component={Session} />
          </Switch>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
