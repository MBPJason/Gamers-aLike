import "./App.css";

// React Dependencies
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Cookies from "js-cookie";

// Axios Dependencies
import axiosConfig, { setAxiosDefaults } from "./utils/AxiosHeaders";
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

const jwtSecret = process.env.SECRET;
function App() {
  // Set up states
  const history = useHistory();
  const [user, setUser] = useState({});
  const [jwt, setJWT] = useState("");

  // On website load, look for cookies
  useEffect(() => {
    const auth = Cookies.get("__AUTH");
    const userInfo = Cookies.get("user");
    // If cookies are present, decoded auth
    if (auth && userInfo) {
      axiosConfig.get("/validate-cookies").then((res) => {
        if (res.status !== 200) {
          axiosConfig.get("/auth/logout"); // Error clear all cookies and login info
        } else if (res.status === 200) {
          setJWT(auth);
        }
      });
    }
  }, []); //Left empty to get initial value only once on first render

  // Second step. Constant look for jwt changes
  useEffect(() => {
    // Check for jwt in state
    if (jwt) {
      // Set axios auth header with jwt token
      setAxiosDefaults(jwt);
    }
  }, [jwt]); // To update when jwt is changed/added

  // First and only render call this useEffect
  useEffect(() => {
    // Check for jwt in state
    if (jwt) {
      axios.get("/api/userInfo").then((res) => {
        const userDecoded = jwtMod.verify(res.data.user, jwtSecret); // Decode response jwt
        setUser(userDecoded); // set user with decoded user info
        history.push("/home"); // send user to home page
      });
    }
  }, []); // First and only render call this useEffect

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
