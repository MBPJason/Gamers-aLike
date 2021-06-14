import React from "react";
import classNames from "classnames";
import { Avatar, Typography, Link } from "@material-ui/core";

// Stylesheets
import useStyles from "../../../assets/jss/myStyles/sessionStyles.js";

export default function MessageBubble(props) {
  // Dependencies and setting up props to be accessed
  const classes = useStyles();
  const { sender, currentUser } = props;

  // Sets message position. Right if you are the main user, Left if not
  let messagePosition =
    sender.username === currentUser
      ? classes.messageRight
      : classes.messageLeft;

  // Renders out the Message in a bubble via jss classes
  return (
    <div
      className={classNames(
        classes.messageBubble,
        messagePosition,
        classes.clearfix
      )}
    >
      <Avatar alt={sender.username} src={sender.userAvatar} />{" "}
      <Link>{sender.username}</Link>
      <Typography className={classes.messageText}>{sender.message}</Typography>
    </div>
  );
}
