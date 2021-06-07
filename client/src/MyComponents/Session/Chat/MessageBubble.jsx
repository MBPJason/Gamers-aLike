import React from "react";
import classNames from "classnames";
import { Avatar, Typography } from "@material-ui/core";

// Stylesheets
import useStyles from "../../../assets/jss/myStyles/sessionStyles.js";

export default function MessageBubble(props) {
  const classes = useStyles();
  const { sender, currentUser } = props;

  let messagePosition =
    sender.username === currentUser
      ? classes.messageRight
      : classes.messageLeft;

  return (
    <div
      className={classNames(
        classes.messageItem,
        messagePosition,
        classes.clearfix
      )}
    >
      <Avatar alt={sender.username} src={sender.userAvatar} className />
      <Typography className>{sender.message}</Typography>
    </div>
  );
}
