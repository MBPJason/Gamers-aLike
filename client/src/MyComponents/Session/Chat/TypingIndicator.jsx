import React from "react";

// Stylesheets
import useStyles from "../../../assets/jss/myStyles/sessionStyles.js";

export default function TypingIndicator(props) {
  const classes = useStyles();

  // Sets up variables to use for logic gates and for loop
  const usersTyping = props.usersTyping;
  let typersDisplay = "";
  let trueTyperCount = 0;

  // Looping through provided users typing from socket.io
  for (let i = 0; i < usersTyping.length; i++) {
    // Removing self from potential users typing array
    if (usersTyping[i] === !props.currentUser) {
      // Taking returned data/usernames and formatting it
      typersDisplay += ", " + usersTyping[i]; // returns => , username1, username2, username3, ...
      // Increments typer count to represent true value
      trueTyperCount++;
    }
  }
  // Checks counter for amount typing
  if (trueTyperCount > 3) {
    // If number of typers exceed 3 then returns string below
    typersDisplay = "A bunch of people are ";
    // Checks if number of typers exceed 0 but are 3 or less
  } else if (trueTyperCount > 0 && trueTyperCount <= 3) {
    // Removes first "," to correct formatting
    typersDisplay = typersDisplay.substr(1);
    // Changes verb to singular or plural version depending on number of typers
    typersDisplay += trueTyperCount > 1 ? " are " : " is ";
  }

  // Displays React render if there is a single typer
  if (trueTyperCount > 0) {
    return (
      <div className={classes.isTyping}>
        {typersDisplay} {"typing"} <span className={classes.isTypingDot}></span>
      </div>
    );
  }
}
