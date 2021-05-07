import React from "react";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";

import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/material-kit-react/views/homePage.js";

const useStyles = makeStyles(styles);

export default function HomePage() {
  const classes = useStyles();

  return (
    <>
      {/* Header component goes here */}
      <div className={classes.containerFluid}>
        {/* See if games are listed via api as competitive, friendly, party, MMO/Raids */}
        {/* If so the here will go a carousel to quick select generes like competitive -> Fighting games --> Skullgirls*/}
        <GridContainer justify='end'>
          <GridItem xs={5} sm={5} md={2}>
            {/* Avatar goes here */}
          </GridItem>
          <GridItem>{/* Rep Score listed here */}</GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={11} sm={11} md={3}>
            {/* Friend/QuickGame List goes here */}
          </GridItem>
        </GridContainer>
      </div>
      <div className={classes.container}>
        <GridContainer>{/* Recently played list */}</GridContainer>
        <GridContainer>{/* Top Played games list */}</GridContainer>
      </div>
    </>
  );
}
