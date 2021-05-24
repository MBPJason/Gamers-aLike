// Styling
import "./App.css";

// Dependencies
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScreenSizeContext from "./context/ScreenSizeContext.jsx";

// Pages
import Landing from "./pages/LandingPage/Landing.jsx";
import Login from "./pages/AuthPages/LoginPage/LoginPage";
import SignUp from "./pages/AuthPages/SignUpPage/SignUpPage";
import Home from "./pages/HomePage/HomePage";

// ============================
// The Entire React App
// ============================
function App() {
  // Setting up State for Screen Responsiveness
  const [state, setState] = useState({
    bigScreens: true,
    desktop: true,
  });
  const { bigScreens, desktop } = state;

  // ===========================================
  // Screen Size Check and Responsiveness
  // ===========================================

  // TODO: Might need to find a way to make this function dryer
  useEffect(() => {
    const setResponsiveness = () => {
      // Check For Mobile
      if (window.innerWidth < 960 && window.innerHeight < 550) {
        return setState({
          bigScreens: false,
          desktop: false,
        });
      }
      // Check for Mobile flipped
      else if (window.innerWidth < 550 && window.innerHeight < 960) {
        return setState({
          bigScreens: false,
          desktop: false,
        });
      }
      // Check for Tablet
      else if (window.innerWidth < 800 && window.innerHeight < 1025) {
        return setState({
          bigScreens: true,
          desktop: false,
        });
      }
      // Check for Tablet flipped
      else if (window.innerWidth < 1025 && window.innerHeight < 800) {
        return setState({
          bigScreens: true,
          desktop: false,
        });
      }
      // Check for iPad Pro
      else if (window.innerWidth === 1024 && window.innerHeight === 1366) {
        return setState({
          bigScreens: true,
          desktop: false,
        });
      }
      // Check for iPad Pro flipped
      else if (window.innerWidth === 1366 && window.innerHeight === 1024) {
        return setState({
          bigScreens: true,
          desktop: false,
        });
      }
      // If nothing else got triggered assume that it is a desktop/laptop screen size
      else {
        return setState({
          bigScreens: true,
          desktop: true,
        });
      }
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  return (
    <>
      <Router>
        <ScreenSizeContext.Provider value={{ bigScreens, desktop }}>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/home' component={Home} />
            <Route path='/Profile' component={Landing} />
            <Route path='/Lobbies' component={Landing} />
          </Switch>
        </ScreenSizeContext.Provider>
      </Router>
    </>
  );
}

export default App;
