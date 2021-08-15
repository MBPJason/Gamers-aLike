import "./App.css";

// React Dependencies
import { useEffect, useState } from "react";
import { Switch, useHistory, withRouter } from "react-router-dom";

// Session Dependencies
import { v4 as uuidV4 } from "uuid";

// Context Dependencies
import Cookies from "js-cookie";
import UserContext from "./MyComponents/Context/UserContext";
import { useSocket } from "./MyComponents/Context/SocketContext";

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
  const socket = useSocket();

  const [user, setUser] = useState();
  const [games, setGames] = useState();
  const [ratings, setRatings] = useState();
  const [friends, setFriends] = useState([]);
  const [playersMet, setPlayersMet] = useState([]);
  const [invites, setInvites] = useState([]);
  const [userSessionId, setUserSessionId] = useLocalStorage("userID");

  const validateCookies = () => {
    const today = new Date();
    const tomorrow = new Date();
    if (!auth) {
      return; // If no auth cookie
    } else {
      console.log("Getting User info");
      // Check cookies for validation
      API.getUserInfo(history, function ({ user, games, ratings }) {
        setUser(user);
        setGames(games);
        setRatings(ratings);
        if (userSessionId === undefined) {
          console.log("Making new uuid and setting socket...");
          setUserSessionId({
            id: uuidV4(),
            date: tomorrow.setDate(today.getDate() + 1),
          });
        } else if (!userSessionId) {
          if (signup) {
            history.push("/finishing-touch");
          } else {
            console.log("Making new uuid and setting socket...");
            setUserSessionId({
              id: uuidV4(),
              date: tomorrow.setDate(today.getDate() + 1),
            });
          }
        } else if (userSessionId.date <= new Date()) {
          setUserSessionId({
            id: uuidV4(),
            date: tomorrow.setDate(today.getDate() + 1),
          });
        }
      });
    }
  };

  const declareOnline = () => {
    // Check for auth cookie and user data
    if (userSessionId && user) {
      console.log("Sending online call...");
      // Send online status
      socket.emit("online", {
        id: userSessionId.id,
        user: {
          username: user.username,
          userAvatar: user.userAvatar || null,
          ratings: user.userRatings,
        },
        dbId: user.userID,
        status: true,
      });
      socket.on("usersOnline", (clients) => {
        console.log(clients);
      });
      // Event Listener for Quickplay list
      socket.on("getFriends", (players) => {
        setFriends(players);
      });
      socket.on("getPlayersMet", (players) => {
        setPlayersMet(players);
      });
      socket.on("getInvites", (invitesArr) => {
        setInvites(invitesArr);
      });
      socket.on("updateFriend", (player) => {
        let newArr = [];
        friends.forEach((friend) => {
          if (friend.user.username === player.user.username) {
            friend = player;
            newArr.push(friend);
          } else {
            newArr.push(friend);
          }
        });
        setFriends(newArr);
      });
      socket.on("displaySuccess", () => {
        // display success message
      });
      socket.on("displayError", () => {
        // display error message
      });
    }
  };

  const noListening = () => {
    socket.offAny();
  };

  // On website load, look for cookies
  useEffect(() => {
    validateCookies();
  }, [userSessionId]);

  // On startup or change of user state, emit online
  useEffect(() => {
    setTimeout(() => {
      declareOnline();
    }, 1000);
    // Clean UP Effect
    return () => {
      if (socket) {
        noListening();
      }
    };
  }, [socket, user]);

  return (
    <>
      <UserContext.Provider
        value={{
          user,
          setUser,
          userSessionId,
          setUserSessionId,
          friends,
          playersMet,
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
