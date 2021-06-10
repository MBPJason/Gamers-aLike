import React, { useState, useContext } from "react";
import MessageTimeline from "./Chat/MessageTimeline";
import TypingIndicator from "./Chat/TypingIndicator";
import ChatUsers from "./Chat/ChatUsers";

// Stylesheets
import useStyles from "../../assets/jss/myStyles/sessionStyles.js";

import {
  Grid,
  Button,
  Typography,
  Avatar,
  Link,
  Paper,
  Container,
  TextField,
} from "@material-ui/core";
import { number } from "prop-types";

// Not dry, just test run. Will grab user data off JWT context. Just a template right now
const users = [
  {
    username: "NoobSlayer",
    userID: "JA9274JD8",
    userAvatar: "https://i.pravatar.cc/300?img=1",
  },
  {
    username: "OwnTime",
    userID: "AKNS02JKV9D",
    userAvatar: "https://i.pravatar.cc/300?img=2",
  },
  {
    username: "MasterChief",
    userID: "NAUJ9292JD",
    userAvatar: "https://i.pravatar.cc/300?img=3",
  },
  {
    username: "JohnnyQuest",
    userID: "K8VNSHT093B",
    userAvatar: "https://i.pravatar.cc/300?img=4",
  },
];

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

  //   States to grab users info for correct display
  const [chatUsers, setChatUsers] = useState(users);
  const [lobbyOwner, setLobbyOwner] = useState(users[0]);
  const [currentUser, setCurrentUser] = useState(users[1]);

  //   States to handle Chatroom messages
  const [timelineMessages, setTimelineMessages] = useState(discord);
  const [messageInput, setMessageInput] = useState("");
  const [typing, setTyping] = useState(false);

  //   States to handle Sessions parameters
  const [limit, setLimit] = useState(number);
  const [discordLink, setDiscordLink] = useState({
    usePublic: true,
    public: "",
    private: lobbyOwner.discordLink,
  });

  const handleTyping = (e) => {
    //   Grabbing value and setting it in the state
    let { value } = e.target;
    setMessageInput(value);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
    }, 3000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (messageInput.trim() > 0) {
      //   utils.message.send(currentUser, messageInput);

      //   Reset input
      setMessageInput("");
    }
  };

  // TODO: Make onClick functions for each of the Linked usernames
  //   const displayChat = discord.map(({ username, userID, message }) => (
  //     <li key={userID}>
  //       <div>
  //         <Link id={userID}>{username}</Link>
  //         <Typography variant={"subtitle1"}> {message}</Typography>
  //       </div>
  //     </li>
  //   ));

  // TODO: Make a user block that slides other users down and displays a mini user card block of info
  //   const displayUsers = users.map(({ username, userID, userAvatar }) => (
  //     <li key={userID}>
  //       <Avatar alt={username} src={userAvatar} />{" "}
  //       <Link id={userID} color='inherit'>
  //         {username}
  //       </Link>
  //     </li>
  //   ));

  return (
    <>
      <Grid container className={classes.root} component={Paper} elevation={10}>
        <Grid
          container
          item
          alignItems='stretch'
          component={Paper}
          className={classes.chatBox}
          xs={9}
        >
          <Container className={classes.chatContainer}>
            <MessageTimeline
              messages={timelineMessages}
              currentUser={currentUser}
            />
          </Container>
          <Grid item>
            <form>
              <TextField id='enterChat' label='Enter ' />
            </form>
          </Grid>
        </Grid>
        <Grid
          container
          item
          alignItems='stretch'
          component={Paper}
          className={classes.usersTab}
          xs={3}
        >
          <Container className={classes.chatContainer}>
            <ChatUsers />
          </Container>
        </Grid>
      </Grid>
    </>
  );
}
