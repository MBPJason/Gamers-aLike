import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import Parallax from "../../components/Parallax/Parallax.js";

import styles from "../../assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import Summary from "./Sections/SummarySection";
import Montage from "./Sections/MontageSection";
import Closing from "./Sections/ClosingSection";
import { Link } from "react-router-dom";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color='transparent'
        routes={dashboardRoutes}
        brand='Gamers-aLike'
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax filter image={"https://source.unsplash.com/random"}>
        <div className={classes.container}>
          <GridContainer justify='center'>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>
                There are none like you, but let's find some that are close.
              </h1>
              <h4>
                Tired of jumping from squad to squad with no really to call a
                gaming homie? Tired of playing with weird and off randoms that
                have you guessing if they had been dropped on their head at
                birth or try hards that know a WAY too colorful version of the
                dictionary?
              </h4>
              <h3>Then let's find some gamers like you.</h3>
              <br />
              <br />
              <br />
            </GridItem>
          </GridContainer>
          <GridContainer justify='center'>
            <GridItem xs={5}>
              <Button color='info' size='lg' fullWidth>
                Learn More
              </Button>
            </GridItem>
            <GridItem xs={5}>
              <Button
                component={Link}
                to={{ pathname: "/Signup", form: "SignUp" }}
                color='primary'
                size='lg'
                fullWidth
              >
                Sign Up
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <Summary />
        </div>
        <div className={classes.containerFluid}>
          <Montage /> {/* Just a test component, it needs to be fleshed out */}
        </div>
        <div className={classes.container}>
          <Closing />
        </div>
      </div>
      <Footer />
    </div>
  );
}
