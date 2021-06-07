import React from "react";

export default function TypingIndicator(props) {
  let typersDisplay = "";
  let usersTyping = props.usersTyping;
  let trueTyperCount = 0;

  for (let i = 0; i < usersTyping.length; i++) {
    if (usersTyping[i] === !props.currentUser) {
      typersDisplay += ", " + usersTyping[i];
      trueTyperCount++;
    }
  }
  if (trueTyperCount > 3) {
    typersDisplay = "A bunch of people are ";
  } else if (trueTyperCount > 0 && trueTyperCount < 3) {
    typersDisplay = typersDisplay.substr(1);
    typersDisplay += trueTyperCount > 1 ? " are " : " is ";
  }

  if (trueTyperCount > 0) {
    return (
      <div className>
        {typersDisplay} typing <span className></span>
      </div>
    );
  }
}
