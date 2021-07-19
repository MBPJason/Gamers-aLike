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
import axiosConfig from "./utils/AxiosHeaders";

// Context Dependencies
import UserContext from "./MyComponents/Context/UserContext";

// Pages
import Landing from "./pages/LandingPage/Landing.jsx";
import Login from "./pages/AuthPages/LoginPage/LoginPage";
import SignUp from "./pages/AuthPages/SignUpPage/SignUpPage";
import Home from "./pages/HomePage/HomePage";
import Lobby from "./pages/LobbyPage/LobbyPage";
import Session from "./pages/SessionPage/SessionPage";
import API from "./utils/API";

function App() {
  // Set up states
  const history = useHistory();
  const [user, setUser] = useState({});
  const [jwt, setJWT] = useState("");

  // On website load, look for cookies
  useEffect(() => {
    const auth = Cookies.get("__AUTH");
    const userInfo = Cookies.get("user");
    // If cookies are present, call server and validate them
    if (auth && userInfo) {
      axiosConfig.get("/validate-cookies").then((res) => {
        if (res.status !== 200) {
          axiosConfig.get("/auth/logout"); // Error clear all cookies and login info
        } else if (res.status === 200) {
          setJWT(auth);
        }
      });
    }
  }, []);

  // First and only render call this useEffect
  useEffect(() => {
    // Check for jwt in state
    if (jwt) {
      API.getUserInfo(setUser, setJWT, history);
    }
  }, []); // First and only render call this useEffect

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
