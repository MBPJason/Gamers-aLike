import "./App.css";

// React Dependencies
import { useEffect, useState } from "react";
import { Route, Switch, useHistory, withRouter } from "react-router-dom";

import io from "socket.io-client";
import { v4 as uuidV4 } from "uuid";

// Context Dependencies
import UserContext from "./MyComponents/Context/UserContext";

// Hooks
import useLocalStorage from "./MyComponents/Hooks/useLocalStorage";

// Pages
import ProtectedRoute from "./MyComponents/ProtectedRoutes/Protected";
import NonLoggedInRoute from "./MyComponents/ProtectedRoutes/NonLogin";
import FinishSignUpRoute from "./MyComponents/ProtectedRoutes/NonLogin";
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
  const [userSessionId, setUserSessionId] = useLocalStorage("userID");

  // On website load, look for cookies
  useEffect(() => {
    console.log("Getting User info");
    API.getUserInfo(history, function (data) {
      setUser(data);
      if (!userSessionId) {
        setUserSessionId(uuidV4());
        history.push("/home");
      }
    });
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{ user, setUser, userSessionId, setUserSessionId }}
      >
        <Switch>
          <NonLoggedInRoute exact path='/' component={Landing} />
          <NonLoggedInRoute exact path='/login' component={Login} />
          <NonLoggedInRoute exact path='/signup' component={SignUp} />
          <FinishSignUpRoute exact path='/finishing-touch' component={SignUp} />
          <ProtectedRoute exact path='/home' component={Home} />
          <ProtectedRoute path='/:username/profile' component={Landing} />
          <ProtectedRoute path='/lobby' component={Lobby} />
          <ProtectedRoute path='/session' component={Session} />
        </Switch>
      </UserContext.Provider>
    </>
  );
}

export default withRouter(App);
