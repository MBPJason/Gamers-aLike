import React from "react";

// Stylesheets
import useStyles from "../../assets/jss/myStyles/sessionStyles.js";

import {
  Grid,
  Button,
  Typography,
  Avatar,
  Paper,
  Container,
  TextField,
} from "@material-ui/core";

const discord = [
  {
    username: "NoobSlayer",
    userID: "JA9274JD8",
    userAvatar: "https://i.pravatar.cc/300?img=1",
    message: "You guys ready to start this up?",
  },
  {
    username: "OwnTime",
    userID: "AKNS02JKV9D",
    userAvatar: "https://i.pravatar.cc/300?img=2",
    message: "Nah not ready yet man",
  },
  {
    username: "MasterChief",
    userID: "NAUJ9292JD",
    userAvatar: "https://i.pravatar.cc/300?img=3",
    message: "I am ready",
  },
  {
    username: "JohnnyQuest",
    userID: "K8VNSHT093B",
    userAvatar: "https://i.pravatar.cc/300?img=4",
    message: "Same here",
  },
  {
    username: "OwnTime",
    userID: "AKNS02JKV9D",
    userAvatar: "https://i.pravatar.cc/300?img=2",
    message: "Don't start yet. Give me like 2 mins",
  },
  {
    username: "OwnTime",
    userID: "AKNS02JKV9D",
    userAvatar: "https://i.pravatar.cc/300?img=2",
    message: "5 mins top",
  },
];

export default function Session() {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.root} component={Paper} elevation={10}>
        <Grid component={Paper} item className={classes.chatBox} xs={9}>
          <Container className={classes.chatContainer}>
            Simple Test Text
          </Container>
          <form>
              <TextField 
                  id="enterChat"
                  label="Enter "
              />
          </form>
        </Grid>
        <Grid component={Paper} item className={classes.usersTab} xs={3}>
          <Container className={classes.chatContainer}>
            Simple Test Text
          </Container>
        </Grid>
      </Grid>
    </>
  );
}
