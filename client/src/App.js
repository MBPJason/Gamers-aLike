// import logo from './logo.svg';
import "./App.css";

// import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Styling

// Pages
import Landing from "./pages/LandingPage/Landing.jsx";
import Login from "./pages/AuthPages/LoginPage/LoginPage";
import SignUp from "./pages/AuthPages/SignUpPage/SignUpPage";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/Signup' component={SignUp} />
          <Route exact path='/Login' component={Login} />
          <Route exact path='/Home' component={Landing} />
          <Route path='/Profile' component={Landing} />
          <Route path='/Lobbies' component={Landing} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
