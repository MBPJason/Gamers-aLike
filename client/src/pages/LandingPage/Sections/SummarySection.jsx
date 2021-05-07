import React from "react";

// Stylesheet
import { makeStyles } from "@material-ui/core/styles";

// Icons
import ThumbsUpDownIcon from "@material-ui/icons/ThumbsUpDown";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import PeopleIcon from '@material-ui/icons/People';

// Core Components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import InfoArea from "../../../components/InfoArea/InfoArea";

import styles from "../../../assets/jss/material-kit-react/views/landingPageSections/productStyle";

const useStyles = makeStyles(styles);

export default function SummarySection() {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <GridContainer justify='center'>
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Missing that 5th or 6th?</h2>
          <h5 className={classes.description}>
            Or what about when you need to find a new squad? Most LFGs put you
            with total randoms that range from mildly displeasing to "Uhh
            someone call the cops I am pretty sure this dude isn{"'"}t all
            there". Well great news this app is design for you. It's hard enough
            to find players to for groups games, it is even harder to find ones
            that are actually fun to play with and keep around.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title='Its a bit crowded...'
              description='Get going with thousands of players and thousands of games to party up with and have a blast in.'
              icon={PeopleIcon}
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title='Alright boys where are we dropping?'
              description='Set up a Lobby or join one and start enjoying the experience of playing with gamers like you, through integration of Discord voice chats'
              icon={RecordVoiceOverIcon}
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title='Survey says...'
              description='After a leaving lobby session give a vote to let other players know what type of gamers you just partied with.'
              icon={ThumbsUpDownIcon}
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
