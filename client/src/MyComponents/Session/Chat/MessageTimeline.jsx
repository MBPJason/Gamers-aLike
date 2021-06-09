import React from "react";
import MessageBubble from "./MessageBubble";

// Stylesheets
import useStyles from "../../../assets/jss/myStyles/sessionStyles.js";

export default function MessageTimeline(props) {
  const classes = useStyles();

  // Pulls in messages array and who is the current user viewing the chat
  const { messages, currentUser } = props;

  // Renders Timeline by mapping through the array. Every element in the given props of an time in the array
  return (
    <div className={classes.messagesTimeline}>
      {messages.map((message, index) => (
        <MessageBubble key={index} sender={message} currentUser={currentUser} />
      ))}
    </div>
  );
}
