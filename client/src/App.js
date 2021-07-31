import "./App.css";

// React Dependencies
import { useEffect, useState } from "react";
import { Switch, useHistory, withRouter } from "react-router-dom";

// Session Dependencies
import { v4 as uuidV4 } from "uuid";
import { io } from "socket.io-client";

// Context Dependencies
import Cookies from "js-cookie";
import UserContext from "./MyComponents/Context/UserContext";

// Hooks
import useLocalStorage from "./MyComponents/Hooks/useLocalStorage";

// Pages/Route Covers
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
  // Set up states and constants
  const signup = Cookies.get("signup");
  const auth = Cookies.get("__AUTH");
  const history = useHistory();
  const [user, setUser] = useState({});
  const [userSessionId, setUserSessionId] = useLocalStorage("userID");
  let socket = io();

  // On website load, look for cookies
  useEffect(() => {
    if (!auth) {
      return;
    } else {
      console.log("Getting User info");
      API.getUserInfo(history, function (data) {
        setUser(data);
        if (userSessionId === undefined) {
          console.log("Making new uuid and setting socket...");
          setUserSessionId(uuidV4());
        } else if (!userSessionId) {
          if (signup) {
            history.push("/finishing-touch");
          } else {
            console.log("Making new uuid and setting socket...");
            setUserSessionId(uuidV4());
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    if (socket && auth) {
      socket.emit("online", { id: userSessionId });
      // socket.disconnect()
      socket.on("usersOnline", (clients) => {
        console.log(clients);
      });
    } else return;

    return () => socket.disconnect();
  }, [auth]);

  return (
    <>
      <UserContext.Provider
        value={{
          user,
          setUser,
          userSessionId,
          setUserSessionId,
        }}
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
