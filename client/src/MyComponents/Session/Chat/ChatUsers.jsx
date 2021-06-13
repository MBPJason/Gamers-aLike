import React from "react";

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
  Link,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

export default function ChatUsers(props) {
  // These should be expandable cards when clicked on.
  // Perhaps a Context should be set up so it can be pulled from for usability anywhere

  const { usersList, lobbyOwner, currentUser } = props;

  return (
    <List>
      {usersList.map((user, index) => (
        <ListItem key={"ListItem" + index} button onClick>
          <ListItemAvatar>
            <Avatar alt={user.username} src={user.userAvatar} />
          </ListItemAvatar>
          <ListItemText component={Link} primary={user.username} />
          {lobbyOwner === currentUser ? (
            <ListItemSecondaryAction>
              <IconButton edge='end'>
                <CloseIcon />
              </IconButton>
            </ListItemSecondaryAction>
          ) : (
            <div></div>
          )}
        </ListItem>
      ))}
    </List>
  );
}
