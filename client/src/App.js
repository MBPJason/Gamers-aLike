// import logo from './logo.svg';
import "./App.css";

// import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Styling

// Pages
import Landing from "./pages/LandingPage/Landing.jsx";
import Login from "./pages/AuthPages/LoginPage/LoginPage";
import SignUp from "./pages/AuthPages/SignUpPage/SignUpPage";
import Home from "./pages/HomePage/HomePage";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/home' component={Home} />
          <Route path='/Profile' component={Landing} />
          <Route path='/Lobbies' component={Landing} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
