import React from "react";
import MessageBubble from "./MessageBubble";

// Stylesheets
import useStyles from "../../../assets/jss/myStyles/sessionStyles.js";

export default function MessageTimeline(props) {
  const classes = useStyles();

  const { messages, currentUser } = props;

  return (
    <div>
      {messages.map((index, message) => (
        <MessageBubble key={index} sender={message} currentUser={currentUser} />
      ))}
    </div>
  );
}
