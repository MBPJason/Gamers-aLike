// import logo from './logo.svg';
import "./App.css";

// import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Styling

// Pages
import Landing from "./pages/LandingPage/Landing.jsx";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/Signup' component={Landing} />
          <Route exact path='/Login' component={Landing} />
          <Route exact path='/Home' component={Landing} />
          <Route path='/Profile' component={Landing} />
          <Route path='/Lobbies' component={Landing} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
