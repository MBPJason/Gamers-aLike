import "./App.css";

// React Dependencies
import { useEffect, useState } from "react";
import { Route, Switch, useHistory, withRouter } from "react-router-dom";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // On website load, look for cookies
  useEffect(() => {
    const auth = Cookies.get("__AUTH");
    const userInfo = Cookies.get("user");
    const signup = Cookies.get("signup");
    // If cookies are present, call server and validate them
    if (auth && userInfo) {
      if (signup) {
        history.push("/finishing-touch");
      } else if (userInfo.loggedIn) {
        setJWT(auth);
        API.getUserInfo(setUser, setJWT, setIsLoggedIn);
      } else {
        setJWT(auth);
        API.getUserInfo(setUser, setJWT, setIsLoggedIn, history);
      }
    }
  }, [history]);

  return (
    <>
      <UserContext.Provider
        value={{ user, setUser, jwt, setJWT, isLoggedIn, setIsLoggedIn }}
      >
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
    </>
  );
}

export default withRouter(App);
