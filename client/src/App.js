// import logo from './logo.svg';
import "./App.css";
import fs from "fs";
import path from "path";

// React Dependencies
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import cookie from "react-cookie";

// Axios Dependencies
import { setAxiosDefaults } from "./utils/axiosDefaults";
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

const pathToCKey = path.join(__dirname, "../keys/jwtRS256.key.pub");
const CLIENT_KEY = fs.readFileSync(pathToCKey, "utf8");
const jwtSecret = process.env.SECRET;

function App() {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [jwt, setJwt] = useState("");

  useEffect(() => {
    const auth = cookie.load("__AUTH");
    const userInfo = cookie.load("user");
    if (auth && userInfo) {
      jwtMod.verify(auth, CLIENT_KEY, (err, decoded) => {
        if (err) {
          axios.get("/auth/clearAll");
        } else if (decoded) {
          const decID = decoded.sub;
          const userID = userInfo.userID;
          if (decID === userID) {
            setJwt(auth);
          } else {
            axios.get("/auth/clearAll");
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    if (jwt) {
      setAxiosDefaults(jwt);
      axios.get("/api/userInfo").then((res) => {
        const userDecoded = jwtMod.verify(res.body.user, jwtSecret);
        setUser(userDecoded);
        history.push("/home");
      });
    }
  }, [jwt, history]);

  return (
    <>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/home' component={Home} />
            <Route path='/Profile' component={Landing} />
            <Route path='/lobby' component={Lobby} />
            <Route path='/session' component={Session} />
          </Switch>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
